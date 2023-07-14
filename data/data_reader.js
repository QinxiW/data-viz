const get_csv_data = async (filename) => {
    try {
        const response = await d3.csv(filename);
        return response;
    }
    catch (error) {
        console.log(error);
        throw Error(`Failed to get data from file ${filename}`)
    }
}
const year = ['1970', '1971', '1972',
    '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981',
    '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990',
    '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
    '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008',
    '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017',
    '2018', '2019', '2020', '2021', '2022'];
const inflation_by_year = {};
const data = get_csv_data("US_Inflation.csv").then(data => {
console.log(data);
});
