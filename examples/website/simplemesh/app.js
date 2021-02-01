import React from 'react';
import {render} from 'react-dom';

import DeckGL from '@deck.gl/react';
import {FirstPersonView} from '@deck.gl/core';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {SphereGeometry} from '@luma.gl/engine';
import GL from '@luma.gl/constants';

// Data provided by the NASA Jet Propulsion Laboratory, Public domain, via Wikimedia Commons
// const VIDEO_URL = 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Earth_360_Video_The_Call_of_Science.webm';
const VIDEO_URL =
  'https://upload.wikimedia.org/wikipedia/commons/0/0a/NASA_VR-360_Astronaut_Training-_Space_Walk.webm';

const sphere = new SphereGeometry({
  nlat: 50,
  nlong: 50,
  radius: 150
});

const INITIAL_VIEW_STATE = {
  latitude: 0,
  longitude: 0,
  position: [0, 0, 50],
  pitch: 0,
  bearing: 0
};

function HiddenVideo({videoRef}) {
  return (
    <video
      ref={videoRef}
      style={{
        visibility: 'hidden',
        width: '800px',
        height: '427px'
      }}
      id="video"
      loop={true}
      controls
      crossOrigin="anonymouse"
      autoPlay
    >
      <source src={VIDEO_URL} />
    </video>
  );
}

export default function App() {
  const videoRef = React.createRef();

  const layer = new SimpleMeshLayer({
    id: 'simplemesh-layer',
    data: [null],
    texture: videoRef.current,
    mesh: sphere,
    getPosition: d => [0, 0, 0],
    material: false,
    parameters: {cull: true, cullFace: GL.FRONT}
  });

  return (
    <div>
      <DeckGL
        layers={[layer]}
        initialViewState={INITIAL_VIEW_STATE}
        views={new FirstPersonView({})}
        controller={true}
        _animate={true}
      />
      <HiddenVideo videoRef={videoRef} />
    </div>
  );
}

export function renderToDOM(container) {
  render(<App />, container);
}
