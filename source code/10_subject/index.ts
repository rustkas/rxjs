// https://stackblitz.com/

import {
  interval,
  fromEvent,
  Observable,
  take,
  share,
  map,
  sample,
  Subject
} from 'rxjs';


const mySubject = new Subject();

const subscriber1 = mySubject
    .subscribe(
        x => console.log(`Subscriber 1 got ${x}`)
    );

const subscriber2 = mySubject
    .subscribe(
        x => console.log(`Subscriber 2 got ${x}`)
    );


mySubject.next(123);

subscriber2.unsubscribe();

mySubject.next(567);

// Stop stream

const stopSteamsBtn = document.getElementById('stopStreams');
if (stopSteamsBtn) {
  const stop_stream$ = fromEvent(stopSteamsBtn, 'click');
  const stop_stream_subscription = stop_stream$.subscribe((_element) => {
    // subscription1.closed ? true : subscription1.unsubscribe();
    // subscription2.closed ? true : subscription2.unsubscribe();
    stop_stream_subscription.unsubscribe();
    // console.clear();
  });
}
