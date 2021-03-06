const React = require('react');
const ReactTagging = require('../js/reacttagging.jsx');

const sampleSuggestions = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antigua & Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bonaire',
  'Bosnia & Herzegovina',
  'Botswana',
  'Brazil',
  'British Indian Ocean Ter',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Canary Islands',
  'Cape Verde',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Channel Islands',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos Island',
  'Colombia',
  'Comoros',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  'Cote DIvoire',
  'Croatia',
  'Cuba',
  'Curacao',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'East Timor',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Ter',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Great Britain',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guinea',
  'Guyana',
  'Haiti',
  'Hawaii',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea North',
  'Korea South',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macau',
  'Macedonia',
  'Madagascar',
  'Malaysia',
  'Malawi',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Midway Islands',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Nambia',
  'Nauru',
  'Nepal',
  'Netherland Antilles',
  'Netherlands (Holland, Europe)',
  'Nevis',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau Island',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Pitcairn Island',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Republic of Montenegro',
  'Republic of Serbia',
  'Reunion',
  'Romania',
  'Russia',
  'Rwanda',
  'St Barthelemy',
  'St Eustatius',
  'St Helena',
  'St Kitts-Nevis',
  'St Lucia',
  'St Maarten',
  'St Pierre & Miquelon',
  'St Vincent & Grenadines',
  'Saipan',
  'Samoa',
  'Samoa American',
  'San Marino',
  'Sao Tome & Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Tahiti',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad & Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks & Caicos Is',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City State',
  'Venezuela',
  'Vietnam',
  'Virgin Islands (Brit)',
  'Virgin Islands (USA)',
  'Wake Island',
  'Wallis & Futana Is',
  'Yemen',
  'Zaire',
  'Zambia',
  'Zimbabwe',
];

const sampleSuggestionsWithIds = [
  { id: 1, value: 'Audi'},
  { id: 2, value: 'BMW'},
  { id: 3, value: 'Mercedes'},
  { id: 4, value: 'Volkswagen'},
];


function ajaxRequestES6(text) {
  const requestPromise = new Promise(resolve => {
    $.get( 'http://morz.hu/api/fruits.php', { q: text } ).done( data => {
      resolve(data);
    });
  });

  return requestPromise;
}

function ajaxRequestJQuery(text) {
  const requestPromise = $.Deferred();

  $.get( 'http://morz.hu/api/fruits.php', { q: text } ).done( data => {
    requestPromise.resolve(data);
  });

  return requestPromise;
}

// Simple input without suggestions

function onChangeFunction(newVal, oldVal) {
  console.log('Changed from', oldVal, ' to ', newVal);
}

React.render(
  React.createElement(
    ReactTagging, { tags: [], suggestions: [], onChange: onChangeFunction }),
    document.getElementById('renderSimpleReactTaggingHere')
);

// Using promises to validate input

function promiseValidation(data) {
  return new Promise(resolve => {
    // do someting with the data, the resolved object will be inserted into the tags array
    data.hello = 'world';
    resolve(data);
  });
}

React.render(React.createElement(
  ReactTagging, { tags: [], suggestions: [], onChange: onChangeFunction, onAdd: promiseValidation}),
  document.getElementById('renderSimplePromiseReactTaggingHere')
);

// Using predefined suggestions array

React.render(React.createElement(
  ReactTagging, { tags: [{ value: 'Hungary'}], suggestions: sampleSuggestions, onChange: onChangeFunction}), 
  document.getElementById('renderCountriesReactTaggingHere')
);

// AJAX suggestions using ES6 Promise, IE11+

function ajaxRequestES6(text) {
  const requestPromise = new Promise(resolve => {
    $.get( 'http://morz.hu/api/fruits.php', { q: text } ).done( data => {
      resolve(data);
    });
  });

  return requestPromise;
}

React.render(React.createElement(
  ReactTagging, { suggestions: ajaxRequestES6, onChange: onChangeFunction}), 
  document.getElementById('renderMoviesReactTaggingHere')
);

// AJAX suggestions using jQuery

function ajaxRequestJQuery(text) {
  const requestPromise = $.Deferred();

  $.get( 'http://morz.hu/api/fruits.php', { q: text } ).done( data => {
    requestPromise.resolve(data);
  });

  return requestPromise;
}

React.render(React.createElement(
  ReactTagging, { suggestions: ajaxRequestJQuery, onChange: onChangeFunction}), 
  document.getElementById('renderMoviesJqueryReactTaggingHere')
);

// React.render(React.createElement(ReactTagging, { suggestions: sampleSuggestionsWithIds, onChange: onChangeFunction}), document.getElementById('renderCarsReactTaggingHere'));


