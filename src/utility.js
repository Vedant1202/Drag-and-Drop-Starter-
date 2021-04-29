const getElementList = (elementData, dragStartHandler) => {
  const elements = [];

  Object.keys(elementData).forEach(key => {
    let { type, left, top } = elementData[key];

    switch (type) {
      case 'blue':
        elements.push(
          <div
            className="component blue"
            key={key}
            style={{
              position: 'absolute',
              left: left + 'px',
              top: top + 'px',
              zIndex: 100,
            }}
            draggable={true}
            onDragStart={(ev) => { dragStartHandler(ev, type, true, key); }}
          >
            Blue Component
        </div>
        );
        break;

      case 'green':
        elements.push(
          <div
            className="component green"
            key={key}
            style={{
              position: 'absolute',
              left: left + 'px',
              top: top + 'px',
            }}
            draggable={true}
            onDragStart={(ev) => { dragStartHandler(ev, type, true, key); }}
          >
            Green Component
        </div>
        );
        break;

      case 'purple':
        elements.push(
          <div
            className="component purple"
            key={key}
            style={{
              position: 'absolute',
              left: left + 'px',
              top: top + 'px',
            }}
            draggable={true}
            onDragStart={(ev) => { dragStartHandler(ev, type, true, key); }}
          >
            Purple Component
        </div>
        );
        break;

      default:
        break;
    }
  });

  return elements;
}

export { getElementList };