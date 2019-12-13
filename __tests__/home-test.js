import 'react-native';
import React from 'react';
import DealScreen from '../src/screens/DealsScreen';
import renderer from 'react-test-renderer';


test('deals snapshot', () => {
    const snap = renderer.create(<DealScreen />).toJSON;
    expect(snap).toMatchSnapshot();

});
