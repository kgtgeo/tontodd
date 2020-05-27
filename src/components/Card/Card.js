import React from 'react';
import './Card.css';

class Card extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            info: null,
            infoNewCase: null,
        };
    };

    async componentDidMount() {
        const url= "https://cors-anywhere.herokuapp.com/https://api.kawalcorona.com/indonesia";
        const url2 = "https://cors-anywhere.herokuapp.com/https://api.covid19api.com/summary"
        const response = await fetch(url);
        const response2 = await fetch(url2);
        // Data in array type
        const data = await response.json();
        const data2 = await response2.json();
        let dataForInfoNewCase = null;
        data2.Countries.forEach( x => {
            if(x.Country.toLowerCase() === "indonesia"){
                dataForInfoNewCase = x;
            }
        });

        // Access object of information in data a.k.a the dictionary of the information
        this.setState({
            info: data[0],
            infoNewCase : dataForInfoNewCase, 
            loading: false,
        });
        
    }

    render() {
        return(
        <div className="cardinformation">
            <div className="card card--purple">
                    <svg className="logo logo--cross" width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.8799 0V26.8799H0V48.1201H26.8799V75H48.1201V48.1201H75V26.8799H48.1201V0H26.8799Z" fill="#B564D1"/>
                    </svg>
                    <p className="card__heading">Positif</p>
                    {this.state.loading ? (
                        <p className="card__loading">loading...</p>
                    ) : (
                    <div>
                        <p className="card__totalcase">{this.state.info.positif}</p>
                        <p className="card__newcase">+{this.state.infoNewCase.NewConfirmed}</p>
                    </div>
                    )}  
            </div>

            <div className="card card--green">
                <div className="card__container">
                    <svg className="logo logo--healed" width="60" height="75" viewBox="0 0 60 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M48.75 15H41.25V7.5H48.75C49.7446 7.5 50.6984 7.10491 51.4017 6.40165C52.1049 5.69839 52.5 4.74456 52.5 3.75C52.5 2.75544 52.1049 1.80161 51.4017 1.09835C50.6984 0.395088 49.7446 0 48.75 0H18.75C13.7772 0 9.00805 1.97544 5.49175 5.49175C1.97544 9.00805 0 13.7772 0 18.75V71.25C0 72.2446 0.395089 73.1984 1.09835 73.9017C1.80161 74.6049 2.75544 75 3.75 75C4.74456 75 5.69839 74.6049 6.40165 73.9017C7.10491 73.1984 7.5 72.2446 7.5 71.25V18.75C7.5 15.7663 8.68526 12.9048 10.795 10.795C12.9048 8.68526 15.7663 7.5 18.75 7.5H33.75V15H26.25C23.2663 15 20.4048 16.1853 18.295 18.295C16.1853 20.4048 15 23.2663 15 26.25V44.7375C14.9993 46.5934 15.4578 48.4206 16.3345 50.0564C17.2113 51.6921 18.4791 53.0856 20.025 54.1125L26.25 58.275V60C26.25 61.9891 27.0402 63.8968 28.4467 65.3033C29.8532 66.7098 31.7609 67.5 33.75 67.5V71.25C33.75 72.2446 34.1451 73.1984 34.8484 73.9017C35.5516 74.6049 36.5054 75 37.5 75C38.4946 75 39.4484 74.6049 40.1516 73.9017C40.8549 73.1984 41.25 72.2446 41.25 71.25V67.5C43.2391 67.5 45.1468 66.7098 46.5533 65.3033C47.9598 63.8968 48.75 61.9891 48.75 60V58.275L54.975 54.1125C56.5209 53.0856 57.7887 51.6921 58.6655 50.0564C59.5422 48.4206 60.0007 46.5934 60 44.7375V26.25C60 23.2663 58.8147 20.4048 56.705 18.295C54.5952 16.1853 51.7337 15 48.75 15ZM45 33.75H52.5V37.5H48.75C47.7554 37.5 46.8016 37.8951 46.0983 38.5984C45.3951 39.3016 45 40.2554 45 41.25C45 42.2446 45.3951 43.1984 46.0983 43.9016C46.8016 44.6049 47.7554 45 48.75 45H52.5C52.46 45.5693 52.2905 46.1219 52.0046 46.6158C51.7186 47.1097 51.3238 47.5318 50.85 47.85L42.975 53.1375C42.4522 53.4729 42.0209 53.9328 41.7198 54.4761C41.4187 55.0194 41.2573 55.6289 41.25 56.25V60H33.75V56.25C33.7468 55.6323 33.5911 55.025 33.2967 54.4821C33.0023 53.9391 32.5784 53.4772 32.0625 53.1375L24.1875 47.85C23.6716 47.5103 23.2477 47.0484 22.9533 46.5054C22.6589 45.9625 22.5032 45.3552 22.5 44.7375V26.25C22.5 25.2554 22.8951 24.3016 23.5984 23.5984C24.3016 22.8951 25.2554 22.5 26.25 22.5H48.75C49.7446 22.5 50.6984 22.8951 51.4017 23.5984C52.1049 24.3016 52.5 25.2554 52.5 26.25H45C44.0054 26.25 43.0516 26.6451 42.3484 27.3484C41.6451 28.0516 41.25 29.0054 41.25 30C41.25 30.9946 41.6451 31.9484 42.3484 32.6516C43.0516 33.3549 44.0054 33.75 45 33.75Z" fill="#2ED0A8"/>
                    </svg>
                    <p className="card__heading">Sembuh</p>
                    {this.state.loading ? (
                        <p className="card__loading">loading...</p>
                    ) : (
                    <div>
                        <p className="card__totalcase">{this.state.info.sembuh}</p>
                        <p className="card__newcase">+{this.state.infoNewCase.NewRecovered}</p>
                    </div>
                    )}
                </div>
            </div>

            <div className="card card--orange">
                <div className="card__container">
                    <svg className="logo logo--death" width="75" height="22" viewBox="0 0 75 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0H75V21.2402H0V0Z" fill="#F6B670"/>
                    </svg>
                    <p className="card__heading">Meninggal</p>
                    {this.state.loading ? (
                        <p className="card__loading">loading...</p>
                    ) : (
                    <div>
                        <p className="card__totalcase">{this.state.info.meninggal}</p>
                        <p className="card__newcase">+{this.state.infoNewCase.NewDeaths}</p>
                    </div>
                    )}
                </div>
            </div>

        </div>
            
        )
    }
}

export default Card;