/*should have an if geolocation function check to verify that geolocation is available, if not then have some text say something appropriate*/
var info = {};
info.init = false;
$(document).ready(function()
{
  function normT(time)
   {
     if (time > 12)
       {
         time = time -12
         return time;
       }
   }
  
  if (navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(function(position)
    {
      info.long = position.coords.longitude;
      info.lat = position.coords.latitude;      
      var wa = "https://api.wunderground.com/api/2f4c9568b3abb09a/conditions/q/" + info.lat + "," + info.long + ".json";
      
      $.ajax({
        url : wa,
        dataType : "jsonp",
        success : function(data) {
          //console.log(data.current_observation);          
          info.place = data.current_observation.display_location.city;
          info.sky = data.current_observation.icon;
          info.skyIcon = data.current_observation.icon_url;
          info.nation = data.current_observation.display_location.country;
          info.state = data.current_observation.display_location.state;
          info.bool = true;
          info.forecast = "https://www.wunderground.com/?apiref=dee981a11419cdb3/" + info.nation + "/" + info.state + "/" + info.place;
          info.imageWU = data.current_observation.image.url;
          info.skyPic = data.current_observation.icon_url;
          info.dewF = data.current_observation.dewpoint_f;
          info.dewC = data.current_observation.dewpoint_c;
          info.oldTime = data.current_observation.local_time_rfc822.substring(0,22);     
          //instead of doing these computations I might be able to use the toDateString() method after info.time if it is a simple Date object
         info.newT = info.oldTime.slice(-5, -3);
         function normT(time)
          {
            if (time > 12)
              {
                time = time -12
                return time;
              }
              else if (time.charAt(0) == 0)
                {
                  return time.substring(1);
                }
              else
                {
                  return time;
                }
          }
          var utime = normT(info.newT);//this is now undefined, needs fixing
          //console.log(utime); 
          //console.log(info.time.slice(-5,-3) )
          //console.log(info.time.substring(17));
          var subTime = info.oldTime.substring(17);
          //console.log(utime +":" + subTime.substring(3));
          info.time = info.oldTime.substring(0,16) + " " + utime +":" + subTime.substring(3);
          
          info.tz = data.current_observation.local_tz_long;
          info.rain = data.current_observation.precip_today_in;
          info.rainC = data.current_observation.precip_today_metric;
          //info.humid = data.current_observation.relative_humidity; this shows relative humidty which goes up to 100%
          info.temp = data.current_observation.temp_f;
          info.tempC = data.current_observation.temp_c;
          //info.uv = data.current_observation.UV; WU uv index doesn't seem to be working as it's always a value of 0.0
          info.wind = data.current_observation.wind_string;
          info.wndeg = data.current_observation.wind_dir;
          info.weath = data.current_observation.weather;
          info.wchill = data.current_observation.windchill_string;
          info.fcURL = data.current_observation.forecast_url;
          info.elev = data.current_observation.observation_location.elevation;    
          info.press = data.current_observation.pressure_in;
          info.pressC = data.current_observation.pressure_mb;
          info.vis = data.current_observation.visibility_mi;
          info.visC = data.current_observation.visibility_km;
          info.windS = data.current_observation.wind_mph;
          info.windSC = data.current_observation.wind_kph;
          
    },//ends the ajax success function
        
    });//ends the ajax function
      var wa2 = "https://api.wunderground.com/api/2f4c9568b3abb09a/forecast/q/" + info.lat + "," + info.long + ".json";
      
      $.ajax({
        url : wa2,
        dataType : "jsonp",
        success : function(fcdata) {
           //console.log(fcdata.forecast.simpleforecast.forecastday[0].avehumidity);
          info.humid = fcdata.forecast.simpleforecast.forecastday[0].avehumidity;
          info.p0 = fcdata.forecast.txt_forecast.forecastday[0].title;  
          info.cond0 = fcdata.forecast.txt_forecast.forecastday[0].fcttext;
          info.condM0 = fcdata.forecast.txt_forecast.forecastday[0].fcttext_metric;
          info.ic0 = fcdata.forecast.txt_forecast.forecastday[0].icon;
          info.icp0 = fcdata.forecast.txt_forecast.forecastday[0].icon_url;
          info.tempFH0 = fcdata.forecast.simpleforecast.forecastday[0].high.fahrenheit;
          info.tempCH0 = fcdata.forecast.simpleforecast.forecastday[0].high.celsius;
          info.tempFL0 = fcdata.forecast.simpleforecast.forecastday[0].low.fahrenheit;
          info.tempCL0 = fcdata.forecast.simpleforecast.forecastday[0].low.celsius;
          info.cor = fcdata.forecast.simpleforecast.forecastday[0].pop;
          
          //info.windS = fcdata.forecast.simpleforecast.forecastday[0].avewind.mph;      /**********************************************************************/
          info.p1 = fcdata.forecast.txt_forecast.forecastday[1].title;  
          info.cond1 = fcdata.forecast.txt_forecast.forecastday[1].fcttext;
          info.condM1 = fcdata.forecast.txt_forecast.forecastday[1].fcttext_metric;
          info.ic1 = fcdata.forecast.txt_forecast.forecastday[1].icon;
          info.icp1 = fcdata.forecast.txt_forecast.forecastday[1].icon_url;
          info.tempFH1 = fcdata.forecast.simpleforecast.forecastday[1].high.fahrenheit;
          info.tempCH1 = fcdata.forecast.simpleforecast.forecastday[1].high.celsius;
          info.tempFL1 = fcdata.forecast.simpleforecast.forecastday[1].low.fahrenheit;
          info.tempCL1 = fcdata.forecast.simpleforecast.forecastday[1].low.celsius;
          /**********************************************************************/
          info.p2 = fcdata.forecast.txt_forecast.forecastday[2].title;  
          info.cond2 = fcdata.forecast.txt_forecast.forecastday[2].fcttext;
          info.condM2 = fcdata.forecast.txt_forecast.forecastday[2].fcttext_metric;
          info.ic2 = fcdata.forecast.txt_forecast.forecastday[2].icon;
          info.icp2 = fcdata.forecast.txt_forecast.forecastday[2].icon_url;
          info.tempFH2 = fcdata.forecast.simpleforecast.forecastday[2].high.fahrenheit;
          info.tempCH2 = fcdata.forecast.simpleforecast.forecastday[2].high.celsius;
          info.tempFL2 = fcdata.forecast.simpleforecast.forecastday[2].low.fahrenheit;
          info.tempCL2 = fcdata.forecast.simpleforecast.forecastday[2].low.celsius;
          /**********************************************************************/
          info.p3 = fcdata.forecast.txt_forecast.forecastday[3].title;  
          info.cond3 = fcdata.forecast.txt_forecast.forecastday[3].fcttext;
          info.condM3 = fcdata.forecast.txt_forecast.forecastday[3].fcttext_metric;
          info.ic3 = fcdata.forecast.txt_forecast.forecastday[3].icon;
          info.icp3 = fcdata.forecast.txt_forecast.forecastday[3].icon_url;
          info.tempFH3 = fcdata.forecast.simpleforecast.forecastday[3].high.fahrenheit;
          info.tempCH3 = fcdata.forecast.simpleforecast.forecastday[3].high.celsius;
          info.tempFL3 = fcdata.forecast.simpleforecast.forecastday[3].low.fahrenheit;
          info.tempCL3 = fcdata.forecast.simpleforecast.forecastday[3].low.celsius;
          /**********************************************************************/
          info.p4 = fcdata.forecast.txt_forecast.forecastday[4].title; 
          info.cond4 = fcdata.forecast.txt_forecast.forecastday[4].fcttext;
          info.condM4 = fcdata.forecast.txt_forecast.forecastday[4].fcttext_metric;
          info.ic4 = fcdata.forecast.txt_forecast.forecastday[4].icon;
          info.icp4 = fcdata.forecast.txt_forecast.forecastday[4].icon_url;
          /**********************************************************************/          
          info.p5 = fcdata.forecast.txt_forecast.forecastday[5].title;  
          info.cond5 = fcdata.forecast.txt_forecast.forecastday[5].fcttext;
          info.condM5 = fcdata.forecast.txt_forecast.forecastday[5].fcttext_metric;
          info.ic5 = fcdata.forecast.txt_forecast.forecastday[5].icon;
          info.icp5 = fcdata.forecast.txt_forecast.forecastday[5].icon_url;
          /**********************************************************************/
          info.p6 = fcdata.forecast.txt_forecast.forecastday[6].title;  
          info.cond6 = fcdata.forecast.txt_forecast.forecastday[6].fcttext;
          info.condM6 = fcdata.forecast.txt_forecast.forecastday[6].fcttext_metric;
          info.ic6 = fcdata.forecast.txt_forecast.forecastday[6].icon;
          info.icp6 = fcdata.forecast.txt_forecast.forecastday[6].icon_url;

        }//ends the 2nd ajax success function call
       
      });//ends the 2nd ajax function
      
      var wa3 = "https://api.wunderground.com/api/2f4c9568b3abb09a/astronomy/q/" + info.lat + "," + info.long + ".json";
      
      $.ajax({
        url : wa3,
        dataType : "jsonp",
        success : function(dataA){
          //console.log(dataA);
          info.moon = dataA.moon_phase.phaseofMoon;
          info.sunrise = dataA.sun_phase.sunrise.hour + ":" + dataA.sun_phase.sunrise.minute + " a.m.";
          info.oldsunset = dataA.sun_phase.sunset.hour + ":" + dataA.sun_phase.sunset.minute;
          var newSun = info.oldsunset.substring(0,2);
          var nset = normT(newSun);
          //console.log(nset);
          info.sunset = nset + ":" + info.oldsunset.substring(3) + " p.m.";
          
          switch (info.moon)
           {
            case 'First Quarter':
              info.moonPic = 'http://www.universetoday.com/wp-content/uploads/2010/06/Flying-Across-the-Moon1.jpg';
              break;
              
            case 'Waxing Gibbous':
              info.moonPic = 'http://fullmoonphases.com/wp-content/uploads/2012/05/Waxing-Gibbous-Moon.jpg?566838';
              break;
              
            case 'Full':
              info.moonPic = 'http://www.space.com/images/i/000/057/608/original/full-moon-photo-nasa.jpg?interpolation=lanczos-none&downsize=*:1000';
              break;
              
            case 'Waning Gibbous':
              info.moonPic = 'http://lunaf.com/img/moon/phase-21.png';
              break;
              
            case 'Third Quarter':
              info.moonPic = 'http://fullmoonphases.com/wp-content/uploads/2012/05/Last-Quarter-Moon.jpg?566838';
              break;
            
            case 'Waning Crescent':
              info.moonPic = 'http://fullmoonphases.com/wp-content/uploads/2012/05/Waning-Crescent-Moon.jpg?566838';
              break;
              
            case 'New Moon':
              info.moonPic = 'http://fullmoonphases.com/wp-content/uploads/2012/05/New-Moon.jpg?566838';
              break;
              
            case 'Waxing Crescent':
              info.moonPic = 'http://stars.astro.illinois.edu/moon/cr1110r.jpg';
              break;
              
            default:
              info.moonPic = '';
              break;
            
           }
         // console.log(info.sunset);
        } 
      })//ends the ajax call with astronomy
      
      
      
      })//ends the navigator location getCurrentPosition function
    }//ends the if (navigator.location statement)
    else
    {
      console.log("Most current browsers will not get this far, best workaround would be a setTimeout function, if you are reading this the Ajax call didn't succeed");
      
    }
   /*******************************sub menu function*********************************************/
 
  $('.dropdown-submenu a.test').on("click", function(e){
    $(this).next('ul').toggle();
    console.log(this.id);
    if (this.id == 'am1')
      {
        $('#ds2').hide();
        $('#ds3').hide();
        $('#ds4').hide();
      }   
    else if (this.id == 'am2')
      {
         $('#ds1').hide();
         $('#ds3').hide();
         $('#ds4').hide();
      }
    else if (this.id == 'am3')
      {
         $('#ds1').hide();
         $('#ds2').hide();
         $('#ds4').hide();
      }
     else if (this.id == 'am4')
      {
         $('#ds1').hide();
         $('#ds2').hide();
         $('#ds3').hide();
      }
    e.stopPropagation();
    e.preventDefault();
  });

  
  
})//ends the document.ready function
/*********************************************************************************/
function loaded()/*fills out the DOM when AJAX is done*/
{
  info.init = true;  
  $('#wl').html ("<b>Weather in " + info.place + ", " + info.state + " (" + info.nation + ")" + "</b>");
          
          $('#day').html("<img src = " + "'" + info.skyPic + "'" + "/>" + "<br>Weather is " + info.sky + "<br>The temperature is " + info.temp + " °" + " F" + "<br>Chance of Rain " + info.cor + "%" +"<br>Today's high " + info.tempFH0 + " °" + " F"+ "<br>Today's low " + info.tempFL0 + " °" + " F" + "<br>The wind is " + info.wind + " going " + info.wndeg + "<br>The average humidity is " + info.humid + "%");
  
   document.getElementById('forecast').innerHTML = "Precipitation accumulation " + info.rain + " in" + "<br>The dewpoint is " + info.dewF + " °" + " F" + "<br>Wind speed " + info.windS + " mph" + "<br>Visibility is " + info.vis + " mi" + "<br>Pressure is " + info.press + " in"  +  "<br>Sunrise at " + info.sunrise + "<br>Sunset at " + info.sunset + "<br>Phase of Moon: " + info.moon + "<br>" + "<img id = 'moonImg' src = " + info.moonPic + ">"; 
  
  $('#spec').html("<div class = 'adjust'>"+info.time + "<br>Timezone: " + info.tz + "<br>Latitude: " + info.lat.toPrecision(3) +", " + " Longitude: " + info.long.toPrecision(3) + "<br>Elevation: " + info.elev + "</div>");
          
         
              
          document.getElementById('fc').innerHTML = "Here is a link to <a href = 'https://www.imdb.com' target = 'blank'>IMDB</a>"; //"For a more comprehensive forecast check <a href = " + "'" + info.forecast + "'" + " target = 'blank'>Weather Underground</a>";
         
      if (info.temp >= 70){
        $('body').css('background-image', 'url(' + "http://www.planwallpaper.com/static/images/3D-Beach-Wallpaper-HD-Download.jpg " + ')');
         }
      else if (info.temp >=35 && info.temp <70) {
         $('body').css('background-image', 'url(' + "https://newevolutiondesigns.com/images/freebies/hd-wallpaper-6.jpg" + ')');
        }
      
      else {
        $('body').css('background-image', 'url(' + "http://www.planwallpaper.com/static/images/canada-winter-moraine-lake-alberta-hd-high-511002.jpg" +')');
      }
          document.getElementById('fc').innerHTML =  "For a more comprehensive forecast check <a href = " + "'" + info.forecast + "'" + " target = 'blank'>Weather Underground</a>";
  /**********ends first ajax success ****************************************************************************************************************/
   document.getElementById('se0').innerHTML = "<b>" + info.p0 + "</b>" + "<br>" + "<img src = '" + info.icp0 + "'"  + "/>" + "<br>" + info.cond0;           
          document.getElementById('se1').innerHTML = "<b>" + info.p1 + "</b>" + "<br>" + "<img src = '" + info.icp1 + "'"  + "/>" + "<br>" + info.cond1;           
          document.getElementById('se2').innerHTML = "<b>" + info.p2 + "</b>" + "<br>" + "<img src = '" + info.icp2 + "'"  + "/>" + "<br>" + info.cond2;          
          document.getElementById('se3').innerHTML = "<b>" + info.p3 + "</b>" + "<br>" + "<img src = '" + info.icp3 + "'"  + "/>" + "<br>" + info.cond3;           
          document.getElementById('se4').innerHTML = "<b>" + info.p4 + "</b>" + "<br>" + "<img src = '" + info.icp4 + "'"  + "/>" + "<br>" + info.cond4;          
          document.getElementById('se5').innerHTML = "<b>" + info.p5 + "</b>" + "<br>" + "<img src = '" + info.icp5 + "'"  + "/>" + "<br>" + info.cond5;          
          document.getElementById('se6').innerHTML = "<b>" + info.p6 + "</b>" + "<br>" + "<img src = '" + info.icp6 + "'"  + "/>" + "<br>" + info.cond6;
          
}//ens the LOADED Function ************************************************************************************

function calcDegrees() {
  if (info.bool === true) {
   
   $('#day').html("<img src = " + "'" + info.skyPic + "'" + "/>" + "<br>Weather is " + info.sky + "<br>The temperature is " + info.tempC + " °" + " C" + "<br>Chance of Rain " + info.cor + "%" +"<br>Today's high " + info.tempCH0 + " °" + " C"+ "<br>Today's low " + info.tempCL0 + " °" + " C" + "<br>The wind is " + info.wind + " going " + info.wndeg + "<br>The average humidity is " + info.humid + "%"); 
    
    document.getElementById('forecast').innerHTML = "Precipitation accumulation " + info.rainC + " mm" +  "<br>The dewpoint is " + info.dewC + " °" + " C" + "<br>Wind speed " + info.windSC + " kph" + "<br>Visibility is " + info.visC + " km" + "<br>Pressure is " + info.pressC + " mb" + "<br>Sunrise at " + info.sunrise + "<br>Sunset at " + info.sunset + "<br>Phase of Moon: " + info.moon + "<br>" + "<img id = 'moonImg' src = " + info.moonPic + ">";  
    
    
    $('#two').text("Toggle Imperial");
    $('#tglBtn').text("M");
      
    return info.bool = false;
  } else 
  {
    
    $('#day').html("<img src = " + "'" + info.skyPic + "'" + "/>" + "<br>Weather is " + info.sky + "<br>The temperature is " + info.temp + " °" + " F" + "<br>Chance of Rain " + info.cor + "%" +"<br>Today's high " + info.tempFH0 + " °" + " F"+ "<br>Today's low " + info.tempFL0 + " °" + " F" + "<br>The wind is " + info.wind + " going " + info.wndeg + "<br>The average humidity is " + info.humid + "%");
    
    document.getElementById('forecast').innerHTML = "Precipitation accumulation " + info.rain + " in" +  "<br>The dewpoint is " + info.dewF + " °" + " F" + "<br>Wind speed " + info.windS + " mph" + "<br>Visibility is " + info.vis + " mi" + "<br>Pressure is " + info.press + " in"  +  "<br>Sunrise at " + info.sunrise + "<br>Sunset at " + info.sunset + "<br>Phase of Moon: " + info.moon + "<br>" + "<img id = 'moonImg' src = " + info.moonPic + ">"; 
          
    $('#two').text("Toggle Metric");
    $('#tglBtn').text("I");
    return info.bool = true;
  }
}
$('#tglBtn').on('click',calcDegrees);//changes measurement system

var interval = setInterval(function()
{
  if (info.forecast && info.wind && info.weath && info.skyPic && info.temp && info.p0 && info.icp6 && !info.init)
  {
    loaded();
  }
}, 450);

 interval();

  
