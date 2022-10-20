// https://stackblitz.com/

import {
  interval,
  fromEvent,
  Observable,
  take,
  share,
  map,
  sample,
  filter,
  Subject,
} from 'rxjs';

// let keyValue: string;
// let inputValue: string;

const mySubject: Subject<Event> = new Subject();

document.getElementById('myInput').addEventListener('input', (event) => {
  mySubject.next(event);
});

document.getElementById('myInput').addEventListener('keyup', (event) => {
  mySubject.next(event);
});

// Subscriber 1
mySubject
  .pipe(
    filter(({ type }) => type === 'keyup'),
    map((e) => (<KeyboardEvent>e).key)
  )
  .subscribe(
    (value) => (document.getElementById('keyValue').innerText = value)
  );

// Subscriber 2
mySubject
  .pipe(
    filter(({ type }) => type === 'input'),
    map((e) => (<HTMLInputElement>e.target).value)
  )
  .subscribe(
    (value) => (document.getElementById('inputValue').innerText = value)
  );

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
