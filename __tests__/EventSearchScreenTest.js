import 'react-native';
import React from 'react';
import DealScreen from '../src/screens/DealsScreen';
import SearchScreen from '../src/screens/SearchScreen'
import renderer from 'react-test-renderer';
import act from 'react-test-renderer'
import TestRenderer from 'react-test-renderer'
import EventsSearchScreen from '../src/screens/EventsSearchScreen'


describe( "render tests", () => {
    jest.useFakeTimers();
    it('Eventsearchscreen Test', async done => {
        var snap;  
       await TestRenderer.act(async () => {
            snap = await renderer.create(<EventsSearchScreen />);
       });
       let tree = snap.toJSON;
       await expect(tree).toMatchSnapshot();
        done();
    });
});