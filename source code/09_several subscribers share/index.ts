// https://stackblitz.com/

import {
  interval,
  fromEvent,
  Observable,
  take,
  share,
  map,
  sample,
} from 'rxjs';

const keyup: Observable<any> = fromEvent(
  document.getElementById('my_input'),
  'keyup'
);

const keyupValue = keyup.pipe(
  map((event) => event.target.value),
  share()
);

let data1: string;
let data2: string;

// Subscribe to each keyup
keyupValue.subscribe({
  next: (value) => {
    data1 = value;
    console.log('data1', data1);
  },
});

// Subscribe to 3-second samples
keyupValue.pipe(sample(interval(3000))).subscribe({
  next: (value) => {
    data2 = value;
    console.log('data2', data2);
  },
});

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
