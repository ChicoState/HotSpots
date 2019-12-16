import 'react-native';
import React from 'react';
import DealScreen from '../src/screens/DealsScreen';
import EventList from '../src/components/EventList'
import renderer from 'react-test-renderer';
import act from 'react-test-renderer'
import TestRenderer from 'react-test-renderer'


describe( "render tests", () => {
    jest.useFakeTimers();
    it('eventlist', async done => {
        var snap;  
       await TestRenderer.act(async () => {
            snap = renderer.create(<EventList  />);
       });
       let tree = snap.toJSON;
       await expect(tree).toMatchSnapshot();
        done();
    });
});