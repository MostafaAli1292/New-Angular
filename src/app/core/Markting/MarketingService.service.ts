import { Injectable } from '@angular/core';
declare var fbq: Function;
declare var gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class MarketingServiceService {
  public onEventFacebook(event: any) {
    fbq('track', event.eventCategory, {
      content_name: event.eventLabel,
      content_category: event.eventCategory,
      content_ids: [],
      content_type: event.eventAction,
      value: event.eventValue,
      currency: 'ARS'
    });
    gtag('event', event.eventCategory, {
      page_title: event.eventLabel,
      page_path: event.eventCategory,

      page_location: event.eventAction

    });
  }

  public setEventData(eventCategory, eventAction, eventLabel): any {
    return {
      eventCategory,
      eventAction,
      eventLabel,
      eventValue: 0
    };
  }
constructor() { }

}
