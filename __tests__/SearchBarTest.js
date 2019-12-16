import 'react-native';
import React from 'react';
import SearchBar from '../src/components/SearchBar'
import renderer from 'react-test-renderer';
import act from 'react-test-renderer'
import TestRenderer from 'react-test-renderer'
import EventsSearchScreen from '../src/screens/EventsSearchScreen'
import { shallow, mount} from "enzyme";


describe( "render tests", () => {
    jest.useFakeTimers();
    it('Eventsearchscreen Test', async done => {
        var snap;  
       await TestRenderer.act(async () => {
            snap = await renderer.create(<SearchBar />);
       });
       let tree = snap.toJSON;
       await expect(tree).toMatchSnapshot();
        done();
    });
});