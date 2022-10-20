// https://stackblitz.com/

import { from, fromEvent, Observable, Observer, of, scheduled } from 'rxjs';

function getProductDetails() {
  setTimeout(function () {
    console.log('Getting customers');
    setTimeout(function () {
      console.log('Getting orders');
      setTimeout(function () {
        console.log('Getting products');
        setTimeout(function () {
          console.log('Getting product details');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}

getProductDetails();
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
