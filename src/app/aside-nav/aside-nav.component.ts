import { Component, OnInit, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
declare var $: any;
declare var initApp: any;

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsideNavComponent implements OnInit {

  constructor(router: Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        $('#left-panel').css('min-height', '');
        $('#main').css('min-height', '');
        $('#main .page-loader').fadeIn(0);
        $('body, html').animate({'scrollTop': 0}, 10);
      }
      if(event instanceof NavigationEnd) {
        setTimeout(function() {
          var maxHeight;
          if($('#left-panel').height() > $('#main').height()) {
            maxHeight = $('#left-panel').height();

            $('#left-panel').css('min-height', maxHeight);
            $('#main').css('min-height', maxHeight + 35); 
          }
          else {
            maxHeight = $('#main').height();

            $('#left-panel').css('min-height', maxHeight + 52);
            $('#main').css('min-height', maxHeight);
          }

          $('#main .page-loader').delay(1000).fadeOut(300);
        }, 500);
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    // initApp.SmartActions();
    // initApp.leftNav();
    // initApp.domReadyMisc();
  }

}
