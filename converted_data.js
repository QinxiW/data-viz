
const year_list = ['1970', '1971', '1972',
    '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981',
    '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990',
    '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
    '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008',
    '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017',
    '2018', '2019', '2020', '2021', '2022']

const headline_cpi = [
    {x: 1970, y: 5.9},
    {x: 1971, y: 4.29},
    {x: 1972, y: 3.27},
    {x: 1973, y: 6.18},
    {x: 1974, y: 11.05},
    {x: 1975, y: 9.14},
    {x: 1976, y: 5.74},
    {x: 1977, y: 6.5},
    {x: 1978, y: 7.63},
    {x: 1979, y: 11.25},
    {x: 1980, y: 13.55},
    {x: 1981, y: 10.33},
    {x: 1982, y: 6.13},
    {x: 1983, y: 3.21},
    {x: 1984, y: 4.3},
    {x: 1985, y: 3.55},
    {x: 1986, y: 1.9},
    {x: 1987, y: 3.66},
    {x: 1988, y: 4.08},
    {x: 1989, y: 4.83},
    {x: 1990, y: 5.4},
    {x: 1991, y: 4.23},
    {x: 1992, y: 3.03},
    {x: 1993, y: 2.95},
    {x: 1994, y: 2.61},
    {x: 1995, y: 2.81},
    {x: 1996, y: 2.93},
    {x: 1997, y: 2.34},
    {x: 1998, y: 1.55},
    {x: 1999, y: 2.19},
    {x: 2000, y: 3.38},
    {x: 2001, y: 2.83},
    {x: 2002, y: 1.59},
    {x: 2003, y: 2.27},
    {x: 2004, y: 2.68},
    {x: 2005, y: 3.39},
    {x: 2006, y: 3.23},
    {x: 2007, y: 2.85},
    {x: 2008, y: 3.84},
    {x: 2009, y: -0.36},
    {x: 2010, y: 1.64},
    {x: 2011, y: 3.16},
    {x: 2012, y: 2.07},
    {x: 2013, y: 1.46},
    {x: 2014, y: 1.62},
    {x: 2015, y: 0.12},
    {x: 2016, y: 1.26},
    {x: 2017, y: 2.14},
    {x: 2018, y: 2.44},
    {x: 2019, y: 1.81},
    {x: 2020, y: 1.23},
    {x: 2021, y: 4.7},
    {x: 2022, y: 8.0}
];

window.headline_cpi = headline_cpi;

const energy_cpi = [
    {x: 1970, y: 0.0},
    {x: 1971, y: 0.0},
    {x: 1972, y: 0.0},
    {x: 1973, y: 0.0},
    {x: 1974, y: 0.0},
    {x: 1975, y: 0.0},
    {x: 1976, y: 0.0},
    {x: 1977, y: 0.0},
    {x: 1978, y: 0.0},
    {x: 1979, y: 0.0},
    {x: 1980, y: 0.0},
    {x: 1981, y: 0.0},
    {x: 1982, y: 0.0},
    {x: 1983, y: 0.0},
    {x: 1984, y: 0.0},
    {x: 1985, y: 0.0},
    {x: 1986, y: 0.0},
    {x: 1987, y: 0.0},
    {x: 1988, y: 0.0},
    {x: 1989, y: 0.0},
    {x: 1990, y: 0.0},
    {x: 1991, y: 0.0},
    {x: 1992, y: 0.0},
    {x: 1993, y: 0.0},
    {x: 1994, y: 0.0},
    {x: 1995, y: 0.0},
    {x: 1996, y: 0.0},
    {x: 1997, y: 0.0},
    {x: 1998, y: 0.0},
    {x: 1999, y: 0.0},
    {x: 2000, y: 0.0},
    {x: 2001, y: 0.0},
    {x: 2002, y: 0.0},
    {x: 2003, y: 0.0},
    {x: 2004, y: 0.0},
    {x: 2005, y: 0.0},
    {x: 2006, y: 0.0},
    {x: 2007, y: 0.0},
    {x: 2008, y: 0.0},
    {x: 2009, y: 0.0},
    {x: 2010, y: 0.0},
    {x: 2011, y: 0.0},
    {x: 2012, y: 0.0},
    {x: 2013, y: 0.0},
    {x: 2014, y: 2.97},
    {x: 2015, y: 2.33},
    {x: 2016, y: 16.9},
    {x: 2017, y: 7.1},
    {x: 2018, y: 25.6},
    {x: 2019, y: 21.27},
    {x: 2020, y: 2.59},
    {x: 2021, y: 21.01},
    {x: 2022, y: 27.12}
];

window.energy_cpi = energy_cpi;


const food_cpi = [
    {x: 1970, y: 5.4},
    {x: 1971, y: 3.07},
    {x: 1972, y: 4.13},
    {x: 1973, y: 13.29},
    {x: 1974, y: 13.76},
    {x: 1975, y: 8.44},
    {x: 1976, y: 3.09},
    {x: 1977, y: 5.96},
    {x: 1978, y: 9.77},
    {x: 1979, y: 10.71},
    {x: 1980, y: 8.56},
    {x: 1981, y: 7.77},
    {x: 1982, y: 4.07},
    {x: 1983, y: 2.23},
    {x: 1984, y: 3.76},
    {x: 1985, y: 2.33},
    {x: 1986, y: 3.26},
    {x: 1987, y: 4.07},
    {x: 1988, y: 4.13},
    {x: 1989, y: 5.67},
    {x: 1990, y: 5.76},
    {x: 1991, y: 3.56},
    {x: 1992, y: 1.38},
    {x: 1993, y: 2.09},
    {x: 1994, y: 2.32},
    {x: 1995, y: 2.76},
    {x: 1996, y: 3.25},
    {x: 1997, y: 2.62},
    {x: 1998, y: 2.12},
    {x: 1999, y: 2.15},
    {x: 2000, y: 2.31},
    {x: 2001, y: 3.09},
    {x: 2002, y: 1.84},
    {x: 2003, y: 2.14},
    {x: 2004, y: 3.37},
    {x: 2005, y: 2.43},
    {x: 2006, y: 2.35},
    {x: 2007, y: 3.91},
    {x: 2008, y: 5.37},
    {x: 2009, y: 1.88},
    {x: 2010, y: 0.79},
    {x: 2011, y: 3.58},
    {x: 2012, y: 2.55},
    {x: 2013, y: 1.41},
    {x: 2014, y: 2.31},
    {x: 2015, y: 1.8},
    {x: 2016, y: 0.34},
    {x: 2017, y: 0.88},
    {x: 2018, y: 1.4},
    {x: 2019, y: 0.89},
    {x: 2020, y: 3.51},
    {x: 2021, y: 3.47},
    {x: 2022, y: 11.35}
];
window.food_cpi = food_cpi;

const core_cpi = [
    {x: 1970, y: 6.245934},
    {x: 1971, y: 4.69},
    {x: 1972, y: 3.06},
    {x: 1973, y: 3.48},
    {x: 1974, y: 8.24},
    {x: 1975, y: 9.22},
    {x: 1976, y: 6.57},
    {x: 1977, y: 6.25},
    {x: 1978, y: 7.31},
    {x: 1979, y: 9.74},
    {x: 1980, y: 12.42},
    {x: 1981, y: 10.47},
    {x: 1982, y: 7.4},
    {x: 1983, y: 3.93},
    {x: 1984, y: 4.94},
    {x: 1985, y: 4.38},
    {x: 1986, y: 4.04},
    {x: 1987, y: 4.12},
    {x: 1988, y: 4.41},
    {x: 1989, y: 4.5},
    {x: 1990, y: 5.03},
    {x: 1991, y: 4.91},
    {x: 1992, y: 3.66},
    {x: 1993, y: 3.3},
    {x: 1994, y: 2.85},
    {x: 1995, y: 2.99},
    {x: 1996, y: 2.7},
    {x: 1997, y: 2.39},
    {x: 1998, y: 2.29},
    {x: 1999, y: 2.08},
    {x: 2000, y: 2.43},
    {x: 2001, y: 2.67},
    {x: 2002, y: 2.32},
    {x: 2003, y: 1.46},
    {x: 2004, y: 1.76},
    {x: 2005, y: 2.17},
    {x: 2006, y: 2.5},
    {x: 2007, y: 2.34},
    {x: 2008, y: 2.3},
    {x: 2009, y: 1.7},
    {x: 2010, y: 0.96},
    {x: 2011, y: 1.66},
    {x: 2012, y: 2.11},
    {x: 2013, y: 1.76},
    {x: 2014, y: 1.75},
    {x: 2015, y: 1.83},
    {x: 2016, y: 2.21},
    {x: 2017, y: 1.84},
    {x: 2018, y: 2.14},
    {x: 2019, y: 2.19},
    {x: 2020, y: 1.7},
    {x: 2021, y: 3.57},
    {x: 2022, y: 6.22}
];
window.core_cpi = core_cpi;

const producer_pi = [
    {x:1970, y: 3.61},
    {x:1971, y: 3.33},
    {x:1972, y: 4.41},
    {x:1973, y: 13.14},
    {x:1974, y: 18.81},
    {x:1975, y: 9.25},
    {x:1976, y: 4.65},
    {x:1977, y: 6.13},
    {x:1978, y: 7.77},
    {x:1979, y: 12.54},
    {x:1980, y: 14.13},
    {x:1981, y: 9.13},
    {x:1982, y: 2.01},
    {x:1983, y: 1.26},
    {x:1984, y: 2.38},
    {x:1985, y: -0.43},
    {x:1986, y: -2.89},
    {x:1987, y: 2.64},
    {x:1988, y: 4.02},
    {x:1989, y: 4.96},
    {x:1990, y: 3.56},
    {x:1991, y: 0.22},
    {x:1992, y: 0.59},
    {x:1993, y: 1.46},
    {x:1994, y: 1.3},
    {x:1995, y: 3.58},
    {x:1996, y: 2.34},
    {x:1997, y: -0.07},
    {x:1998, y: -2.48},
    {x:1999, y: 0.84},
    {x:2000, y: 5.78},
    {x:2001, y: 1.11},
    {x:2002, y: -2.29},
    {x:2003, y: 5.35},
    {x:2004, y: 6.18},
    {x:2005, y: 7.32},
    {x:2006, y: 4.67},
    {x:2007, y: 4.8},
    {x:2008, y: 9.81},
    {x:2009, y: -8.84},
    {x:2010, y: 4.48},
    {x:2011, y: 3.87},
    {x:2012, y: 1.86},
    {x:2013, y: 1.36},
    {x:2014, y: 1.58},
    {x:2015, y: -0.87},
    {x:2016, y: 0.42},
    {x:2017, y: 2.33},
    {x:2018, y: 2.9},
    {x:2019, y: 1.69},
    {x:2020, y: -2.12},
    {x:2021, y: 8.95},
    {x:2022, y: 7.91}
];
window.producer_pi = producer_pi;