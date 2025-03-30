img{
  width: 350px;
  height: 380px;
  margin-top: 15%;
  margin-left: -55rem;
  border-radius: 20%;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .25);
  filter: brightness(100%);
}

<img src={mypic}></img>

------------------------------------------------------------------------------------------------------

# This is an Back ground star animation program
    
  # for render --> 
    <StarrySky/>

------------------------------------------------------------------------------------------------------


  # css for this code -->>
  body {
    background: linear-gradient(to right, rgb(5, 0, 34)100%, #989797 0%);
  }
  --------->>
  #sky {
    width: 100vw;
    height: 100vh;
    position: fixed;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  --------->>
  #shootingstars {
    margin: 0;
    padding: 0;
    width: 150vh;
    height: 100vw;
    position: fixed;
    overflow: hidden;
    transform: translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%))
      rotate(120deg);
  }
  ------------>>
  .wish {
    height: 2px;
    top: 300px;
    width: 100px;
    margin: 0;
    opacity: 0;
    padding: 0;
    background-color: white;
    position: absolute;
    background: linear-gradient(-45deg, white, rgba(253, 253, 254, 0));
    filter: drop-shadow(0 0 6px white);
    overflow: hidden;
  }
  ------------->>

  ------------------------------------------------------------------------------------------------------

  # js code to run this prg

   import React, { Component } from "react";
    import anime from "animejs";
    import './StarrySky.css'

    class StarrySky extends Component {
    state = {
        num: 100,
        vw: Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
        ),
        vh: Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
        ),
    };

    starryNight = () => {
        anime({
        targets: ["#sky .star"],
        opacity: [
            {
            duration: 700,
            value: "0",
            },
            {
            duration: 700,
            value: "1",
            },
        ],
        easing: "linear",
        loop: true,
        delay: (el, i) => 50 * i,
        });
    };

    shootingStars = () => {
        anime({
        targets: ["#shootingstars .wish"],
        easing: "linear",
        loop: true,
        delay: (el, i) => 500 * i,
        opacity: [
            {
            duration: 500,
            value: "1",
            },
        ],
        width: [
            {
            value: "150px",
            },
            {
            value: "0px",
            },
        ],
        translateX: 350,
        });
    };

    randomRadius = () => {
        return Math.random() * 0.9 + 0.6;
    };

    getRandomX = () => {
        return Math.floor(Math.random() * Math.floor(this.state.vw)).toString();
    };

    getRandomY = () => {
        return Math.floor(Math.random() * Math.floor(this.state.vh)).toString();
    };

    componentDidMount() {
        this.starryNight();
        this.shootingStars();
    }

    render() {
        const { num } = this.state;
        return (
        <div id="App">
            <svg id="sky">
            {[...Array(num)].map((x, y) => (
                <circle
                cx={this.getRandomX()}
                cy={this.getRandomY()}
                r={this.randomRadius()}
                stroke="none"
                strokeWidth="0"
                fill="white"
                key={y}
                className="star"
                />
            ))}
            </svg>
            <div id="shootingstars">
            {[...Array(60)].map((x, y) => (
                <div
                key={y}
                className="wish"
                style={{
                    left: `${this.getRandomY()}px`,
                    top: `${this.getRandomX()}px`,
                }}
                />
            ))}
            </div>
        </div>
        );
    }
    }

    export default StarrySky;

#