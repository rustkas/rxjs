// https://stackblitz.com/

import { fromEvent, map, merge, timer } from 'rxjs';

// Emulate first HTTP request that take 3 sec
let threeSecHTTPRequest = timer(3000).pipe(map((value) => 'First responce'));

// Emulate second HTTP request that takes 1 sec
let oneSecHTTPRequest = timer(1000).pipe(map((value) => 'Second responce'));

const subscription1 = merge(threeSecHTTPRequest, oneSecHTTPRequest).subscribe(
  (res) => console.log(res)
);

// Stop stream

const stopSteamsBtn = document.getElementById('stopStreams');
if (stopSteamsBtn) {
  const stop_stream$ = fromEvent(stopSteamsBtn, 'click');
  const stop_stream_subscription = stop_stream$.subscribe((_element) => {
    subscription1.closed ? true : subscription1.unsubscribe();
    // subscription2.closed ? true : subscription2.unsubscribe();
    stop_stream_subscription.unsubscribe();
    // console.clear();
  });
}
