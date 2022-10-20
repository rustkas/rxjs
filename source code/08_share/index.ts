// https://stackblitz.com/

import { interval, fromEvent, Observable, take, share } from 'rxjs';

const numbers = interval(1000);
const takeFiveNumbers = numbers.pipe(take(5),share());

function subscribeToNumbers(name) {
  takeFiveNumbers
      .subscribe(
          x => console.log(` ${name} got ${x}`)
      );
}

subscribeToNumbers('Subscriber 1');

const addSubscription = () =>  subscribeToNumbers('Subscriber 2');

setTimeout(addSubscription, 2500); // Second subscriber joins in 2.5 sec

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
