import 'react-native';
import React from 'react';
import DealScreen from '../src/screens/DealsScreen';
import EventDetails from '../src/components/EventDetail'
import renderer from 'react-test-renderer';
import act from 'react-test-renderer'
import TestRenderer from 'react-test-renderer'


describe( "render tests", () => {
    jest.useFakeTimers();
    it('DealScreen Test', async done => {
        var snap;  
       await TestRenderer.act(async () => {
            snap = renderer.create(<EventDetails />);
       });
       let tree = snap.toJSON;
       await expect(tree).toMatchSnapshot();
        done();
    });
});