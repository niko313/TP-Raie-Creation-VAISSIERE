import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import allLocales from '@fullcalendar/core/locales-all';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template
  localeSelectorEl = document.getElementById('locale-selector');
  calendarEl = document.getElementById('calendar');
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarOptions = {
    buttonText: {
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      list: 'Liste'
    },
    businessHours: {
      start: '00:00',
      end:   '23:59',
      dow:  [1,2,3,4,5],
  },
  };
  locales: allLocales;
  locale: 'fr'; // the default locale
  calendarEvents: EventInput[] = [
    { title: 'RDV Raie-Creation', start: new Date() }
  ];
  

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  handleDateClick(arg) {
    if (confirm('Voulez-vous prendre RDV le : ' + arg.dateStr + ' ?')) {
      arg.date.setHours( arg.date.getHours() + 8 );
      this.calendarEvents = this.calendarEvents.concat({
        title: 'Nouveau RDV',
        start: arg.date,
      })
    }
  }
  // build the locale selector's options
  selectLocale(localeSelectorEl){
    this.calendarComponent.getApi().getAvailableLocaleCodes().forEach(function(localeCode) {
      var optionEl = document.createElement('option');
      optionEl.value = localeCode;
      optionEl.selected = localeCode == "fr";
      optionEl.innerText = localeCode;
      localeSelectorEl.appendChild(optionEl);
    });
    localeSelectorEl.addEventListener('change', function() {
      if (this.value) {
        this.calendarComponent.getApi().setOption('locale', this.value);
      }
    });
  }
}
