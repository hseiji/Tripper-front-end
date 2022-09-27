import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { ListItem } from '../ListItem/ListItem';

afterEach(() => {
  cleanup();
})

test('componenet should be present in document and have text', () => {
  const results = [
    {
      id: 1,
      name: "Saku Sushi",
      url: "https://www.yelp.com/biz/saku-sushi-toronto-2?adjust_creative=zGbNrmtfS5j0G5IKmn8ufA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=zGbNrmtfS5j0G5IKmn8ufA",
      address: "",
      review: "",
      rating: "4",
      image_url: "https://s3-media3.fl.yelpcdn.com/bphoto/xBtbkhP7VY6x6kTuKlznxg/o.jpg",
    }
  ]
  render(<ListItem results={results}/>);
  const myElement = screen.getByTestId('list-item-id');
  expect(myElement).toBeInTheDocument();
  expect(myElement).toHaveTextContent("Rating");
});

test('matches snapshot', () => {
  const results = [
    {
      id: 1,
      name: "Saku Sushi",
      url: "https://www.yelp.com/biz/saku-sushi-toronto-2?adjust_creative=zGbNrmtfS5j0G5IKmn8ufA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=zGbNrmtfS5j0G5IKmn8ufA",
      address: "",
      review: "",
      rating: "4",
      image_url: "https://s3-media3.fl.yelpcdn.com/bphoto/xBtbkhP7VY6x6kTuKlznxg/o.jpg",
    }
  ];
  const tree = renderer.create(<ListItem results={results}/>).toJSON();
  expect(tree).toMatchSnapshot(); 
});