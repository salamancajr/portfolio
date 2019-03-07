import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import About from "./about";
import Navbar from "./navbar";
configure({adapter: new Adapter()})

describe('<About />', () => {
    it('should render one navbar', ()=>{
        const wrapper = shallow(<About />);
        expect(wrapper.find(Navbar)).toHaveLength(1);
    });
});