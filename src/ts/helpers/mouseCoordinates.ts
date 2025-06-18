function getRelativeWindow(event: any) {
  if (!event.targetTouches
    || !event.targetTouches.length) return {
    x: event.clientX,
    y: event.clientY,
  };

  const touch = event.targetTouches[0];

  return {
    x: touch.clientX,
    y: touch.clientY,
  };
}

function getPercentRelativeElement(event: any, element: any, isWithoutLimits: any) {
  const coordinates = getRelativeElement(event, element, isWithoutLimits);
  const elementSize = getElementSize(element);

  if (!isWithoutLimits) {
    // this._addLimits(relativeMouseCoordinates, elementCoordinates);
  }

  return {
    x: Math.round((100 / elementSize.width) * coordinates.x),
    y: Math.round((100 / elementSize.height) * coordinates.y),
  };
}

function addLimits(relativeMouseCoordinates: any, elementCoordinates: any) {
  if (relativeMouseCoordinates.y < 0) {
    relativeMouseCoordinates.y = 0;
  }

  if (relativeMouseCoordinates.x < 0) {
    relativeMouseCoordinates.x = 0;
  }

  const elementHeight = elementCoordinates.bottom - elementCoordinates.top;
  if (relativeMouseCoordinates.y > elementHeight) {
    relativeMouseCoordinates.y = elementHeight;
  }

  const elementWidth = elementCoordinates.right - elementCoordinates.left;
  if (relativeMouseCoordinates.x > elementWidth) {
    relativeMouseCoordinates.x = elementWidth;
  }

  return relativeMouseCoordinates;
}

function getRelativeElement(event: any, element: any, isWithoutLimits = false, addInversion = false) {
  const mouseCoordinates = getRelativeWindow(event);
  const elementCoordinates = element.getBoundingClientRect();
  let y = elementCoordinates.bottom - mouseCoordinates.y;
  if (addInversion) y = mouseCoordinates.y - elementCoordinates.top;

  const relativeMouseCoordinates = {
    x: mouseCoordinates.x - elementCoordinates.left,
    y: y,
  };

  if (!isWithoutLimits) {
    addLimits(relativeMouseCoordinates, elementCoordinates);
  }

  return relativeMouseCoordinates;
}

function getElementSize(element: any) {
  const elementCoordinates = element.getBoundingClientRect();

  return {
    height: elementCoordinates.bottom - elementCoordinates.top,
    width: elementCoordinates.right - elementCoordinates.left,
  };
}

function getRelativeDocumentForOther(event: any) {
  return {
    x: event.pageX,
    y: event.pageY,
  };
}

function getRelativeDocumentForIe(event: any) {
  const html = document.documentElement;
  const body = document.body;

  return {
    x: event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0),
    y: event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0),
  };
}

export default function getRelativeDocument(event: any) {
  if (event.pageX === null && event.clientX !== null) {
    return getRelativeDocumentForIe(event);
  }
  return getRelativeDocumentForOther(event);
}
