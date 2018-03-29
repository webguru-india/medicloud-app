import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GlobalConfigs } from '../global.config';
import { ConsultasExternasService } from '../consultas-externas/consultas-externas.service';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser';
declare var $: any;
declare var modal: any;
declare var calendar: any;
declare var summernote: any;

@Component({
  selector: 'app-consultas-externas-bkp',
  templateUrl: './consultas-externas-bkp.component.html',
  styleUrls: ['./consultas-externas-bkp.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConsultasExternasBkpComponent implements OnInit {
  public appAccessToken: string = this.cookieService.get('accessToken');
  public appUserToken: string = this.cookieService.get('userToken');
  public especialidadData: any;

  constructor(private globalConfigs: GlobalConfigs, private cookieService: CookieService, public pageTitle: Title, private consultasExternasService: ConsultasExternasService) {
    if(typeof this.appAccessToken === 'undefined' || this.appAccessToken == '') {
      window.location.href = this.globalConfigs.baseUrl + 'login';
    }
    this.pageTitle.setTitle('Consultas Externas | Medicloude');

    consultasExternasService.loadSpecialtyData(this.appAccessToken, this.appUserToken)
    .subscribe(resp => {
      console.log(resp);
      this.especialidadData = resp.especialidad;
    });
  
    let date = new Date(),
        d = date.getDate(),
        m = date.getMonth(),
        y = date.getFullYear(),
        hdr = {
          left: 'title',
          center: 'month,agendaWeek,agendaDay',
          right: 'prev,today,next'
        };

    setTimeout(function() {
      $('#to').datepicker({
        dateFormat : 'dd.mm.yy',
        prevText : '<i class="fa fa-chevron-left"></i>',
        nextText : '<i class="fa fa-chevron-right"></i>',
        onSelect : function(selectedDate) {
          $('#finishdate').datepicker('option', 'minDate', selectedDate);
        }
      });

      $('#startdate').datepicker({
        dateFormat : 'dd.mm.yy',
        prevText : '<i class="fa fa-chevron-left"></i>',
        nextText : '<i class="fa fa-chevron-right"></i>',
        onSelect : function(selectedDate) {
          $('#finishdate').datepicker('option', 'minDate', selectedDate);
        }
      });

      $('#startdate1').datepicker({
        dateFormat : 'dd.mm.yy',
        prevText : '<i class="fa fa-chevron-left"></i>',
        nextText : '<i class="fa fa-chevron-right"></i>',
        onSelect : function(selectedDate) {
          $('#finishdate').datepicker('option', 'minDate', selectedDate);
        }
      });

      $('#startdate2').datepicker({
        dateFormat : 'dd.mm.yy',
        prevText : '<i class="fa fa-chevron-left"></i>',
        nextText : '<i class="fa fa-chevron-right"></i>',
        onSelect : function(selectedDate) {
          $('#finishdate').datepicker('option', 'minDate', selectedDate);
        }
      });

      $('#startdate3').datepicker({
        dateFormat : 'dd.mm.yy',
        prevText : '<i class="fa fa-chevron-left"></i>',
        nextText : '<i class="fa fa-chevron-right"></i>',
        onSelect : function(selectedDate) {
          $('#finishdate').datepicker('option', 'minDate', selectedDate);
        }
      });

      $('#startdate4').datepicker({
        dateFormat : 'dd.mm.yy',
        prevText : '<i class="fa fa-chevron-left"></i>',
        nextText : '<i class="fa fa-chevron-right"></i>',
        onSelect : function(selectedDate) {
          $('#finishdate').datepicker('option', 'minDate', selectedDate);
        }
      });

      $('#startdate5').datepicker({
        dateFormat : 'dd.mm.yy',
        prevText : '<i class="fa fa-chevron-left"></i>',
        nextText : '<i class="fa fa-chevron-right"></i>',
        onSelect : function(selectedDate) {
          $('#finishdate').datepicker('option', 'minDate', selectedDate);
        }
      });

      $('#timepicker').timepicker();

/*--Data Chart--*/
    var data = [], totalPoints = 200, $UpdatingChartColors = $("#updating-chart").css('color');
    function getRandomData() {
      if (data.length > 0)
        data = data.slice(1);

      // do a random walk
      while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50;
        var y = prev + Math.random() * 10 - 5;
        if (y < 0)
          y = 0;
        if (y > 100)
          y = 100;
        data.push(y);
      }

      // zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < data.length; ++i)
        res.push([i, data[i]])
      return res;
    }

    // setup control widget
    var updateInterval = 1500;
    $("#updating-chart").val(updateInterval).change(function() {

      var v = $(this).val();
      if (v && !isNaN(+v)) {
        updateInterval = +v;
        $(this).val("" + updateInterval);
      }

    });

    // setup plot
    var options = {
      yaxis : {
        min : 0,
        max : 100
      },
      xaxis : {
        min : 0,
        max : 100
      },
      colors : [$UpdatingChartColors],
      series : {
        lines : {
          lineWidth : 1,
          fill : true,
          fillColor : {
            colors : [{
              opacity : 0.4
            }, {
              opacity : 0
            }]
          },
          steps : false

        }
      }
    };

    var plot = $.plot($("#updating-chart"), [getRandomData()], options);

    /*---Data Chart End-----*/


      $(document).ready(function() {

    /*
     * SUMMERNOTE EDITOR
     */
    
    $('.summernote').summernote({
      height: 200,
      toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'italic', 'underline', 'clear']],
        ['fontname', ['fontname']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['table', ['table']],
        ['insert', ['link', 'picture', 'hr']],
        ['view', ['fullscreen', 'codeview', 'help']]

      ]
    });
  
    /*
     * MARKDOWN EDITOR
     */

    $("#mymarkdown").markdown({
      autofocus:false,
      savable:true
    })




          
  
  })

            /* initialize the calendar
     -----------------------------------------------------------------*/
  
      $('#calendar, #calendar1, #calendar2').fullCalendar({
  
        header: hdr,
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!

        drop: function (date, allDay) { // this function is called when something is dropped

          // retrieve the dropped element's stored Event Object
          var originalEventObject = $(this).data('eventObject');

          // we need to copy it, so that multiple events don't have a reference to the same object
          var copiedEventObject = $.extend({}, originalEventObject);

          // assign it the date that was reported
          copiedEventObject.start = date;
          copiedEventObject.allDay = allDay;

          // render the event on the calendar
          // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
          $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

          // is the "remove after drop" checkbox checked?
          if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            $(this).remove();
          }

        },
  
        select: function (start, end, allDay) {
          var title = prompt('Event Title:');
          if (title) {
            calendar.fullCalendar('renderEvent', {
              title: title,
              start: start,
              end: end,
              allDay: allDay
            }, true);
          }
          calendar.fullCalendar('unselect');
        },
  
        events: [{
          title: 'All Day Event',
          start: new Date(y, m, 1),
          description: 'long description',
          className: ["event", "bg-color-greenLight"],
          icon: 'fa-check'
        }, {
          title: 'Long Event',
          start: new Date(y, m, d - 5),
          end: new Date(y, m, d - 2),
          className: ["event", "bg-color-red"],
          icon: 'fa-lock'
        }, {
          id: 999,
          title: 'Repeating Event',
          start: new Date(y, m, d - 3, 16, 0),
          allDay: false,
          className: ["event", "bg-color-blue"],
          icon: 'fa-clock-o'
        }, {
          id: 999,
          title: 'Repeating Event',
          start: new Date(y, m, d + 4, 16, 0),
          allDay: false,
          className: ["event", "bg-color-blue"],
          icon: 'fa-clock-o'
        }, {
          title: 'Meeting',
          start: new Date(y, m, d, 10, 30),
          allDay: false,
          className: ["event", "bg-color-darken"]
        }, {
          title: 'Lunch',
          start: new Date(y, m, d, 12, 0),
          end: new Date(y, m, d, 14, 0),
          allDay: false,
          className: ["event", "bg-color-darken"]
        }, {
          title: 'Birthday Party',
          start: new Date(y, m, d + 1, 19, 0),
          end: new Date(y, m, d + 1, 22, 30),
          allDay: false,
          className: ["event", "bg-color-darken"]
        }, {
          title: 'Smartadmin Open Day',
          start: new Date(y, m, 28),
          end: new Date(y, m, 29),
          className: ["event", "bg-color-darken"]
        }],
  
        eventRender: function (event, element, icon) {
          if (event.description != "") {
            element.find('.fc-title').append("<br/><span class='ultra-light'>" + event.description + "</span>");
          }
          if (event.icon != "") {
            element.find('.fc-title').append("<i class='air air-top-right fa " + event.icon + " '></i>");
          }
        },
  
        windowResize: function (event, ui) {
          $('#calendar').fullCalendar('render');
        }
      });
  
      /* hide default buttons */
      $('.fc-right, .fc-center').hide();

  
      $('#calendar-buttons #btn-prev').click(function () {
        $('.fc-prev-button').click();
        return false;
      });
    
      $('#calendar-buttons #btn-next').click(function () {
        $('.fc-next-button').click();
        return false;
      });
    
      $('#calendar-buttons #btn-today').click(function () {
        $('.fc-today-button').click();
        return false;
      });
    
      $('#mt').click(function () {
        $('#calendar').fullCalendar('changeView', 'month');
      });
    
      $('#ag').click(function () {
        $('#calendar').fullCalendar('changeView', 'agendaWeek');
      });
    
      $('#td').click(function () {
        $('#calendar').fullCalendar('changeView', 'agendaDay');
      }); 

    }, 500);
  }

  ngOnInit() {
  }

}
