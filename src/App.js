import React, { Component } from 'react';
import './App.css';
import { getElementList } from './utility';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextElementId: 0,
      elementData: {},
      redrag: false,
    };
  }

  dragStart = (ev, type, redrag=false, elementId=null) => {
    ev.dataTransfer.setData("type", type);
    if (redrag) {
      ev.dataTransfer.setData("elementId", elementId);
    }
  }
  
  dragOver = (ev) => {
    ev.preventDefault();
  }
  
  drop = (ev) => {
    ev.preventDefault();
    const type = ev.dataTransfer.getData("type");
    const { elementData } = this.state;
    let { nextElementId } = this.state;
    const newElementData = {
      type,
      left: ev.clientX,
      top: ev.clientY,
    }

    let elementId = ev.dataTransfer.getData("elementId");
    if (elementId) {                                    // check if element is redragged and the ID exists in dataTransfer
      elementId = parseInt(elementId);
      elementData[elementId] = {
        ...elementData[elementId],
        left: ev.clientX,
        top: ev.clientY,
      }
      parseInt(ev.dataTransfer.getData("elementId"))
    } else {
      elementData[nextElementId] = newElementData;
      nextElementId = nextElementId + 1;
    }

    ev.dataTransfer.clearData();

    this.setState({
      elementData,
      nextElementId,
    });
  }

  dropOutside = (ev) => {
    const { elementData } = this.state;
    let elementId = ev.dataTransfer.getData("elementId");
    if (elementId && elementData[elementId]) {
      delete elementData[elementId];
    }

    ev.dataTransfer.clearData();

    this.setState({
      elementData,
    });
  }

  render() { 

    const { elementData } = this.state;
    const elements = [ ...getElementList(elementData, this.dragStart) ];

    return (
      <div className="App">
        <div className="components-list" onDrop={this.dropOutside} onDragOver={this.dragOver}>
          <div className="component blue" draggable={true} onDragStart={(ev) => { this.dragStart(ev, 'blue') }}>
            Blue Component
          </div>
          <div className="component green" draggable={true} onDragStart={(ev) => { this.dragStart(ev, 'green') }}>
            Green Component
          </div>
          <div className="component purple" draggable={true} onDragStart={(ev) => { this.dragStart(ev, 'purple') }}>
            Purple Component
          </div>
        </div>
        <div className="drop-area" onDrop={this.drop} onDragOver={this.dragOver}>
          Drop Area
          { elements }
        </div>
      </div>
    );
  }
}
 
export default App;
