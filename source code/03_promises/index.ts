// https://stackblitz.com/

import { from, fromEvent, Observable, Observer, of, scheduled } from 'rxjs';

function getCustomers() {
  let promise = new Promise(function (resolve, reject) {
    console.log('Getting customers');
    // Emulate an async server call here
    setTimeout(function () {
      let success = true;
      if (success) {
        resolve('John Smith'); // got the customer
      } else {
        reject("Can't get customers");
      }
    }, 1000);
  });
  return promise;
}

function getOrders(customer) {
  let promise = new Promise(function (resolve, reject) {
    // Emulate an async server call here
    setTimeout(function () {
      let success = true;
      if (success) {
        resolve(`Found the order 123 for ${customer}`); // got the order
      } else {
        reject("Can't get orders");
      }
    }, 1000);
  });
  return promise;
}

console.log('Chained getCustomers and getOrders. Waiting for results');

getCustomers()
  .then((cust) => console.log(cust))
  .then((cust) => getOrders(cust))
  .then((order) => console.log(order))
  .catch((err) => console.error(err));

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
