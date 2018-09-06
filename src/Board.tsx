import * as React from 'react';
import './Board.css';

interface IProps{
  value:number, onClick?:()=>void
}

function Square(props: IProps) {
  return(
    <button
      className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function SquareAndDiagonalLine(props: IProps){
  return(
    <button
      className="square">
      <div className='value'>
       {props.value}     
      </div>
      <div className='image'>
        <img src="https://www.pets-n-friends.com/image.edit/imagelibrary/petsnfriends/shapes/line_45_007_black.png"  width="34px" height="34px"/> 
      </div>
      </button>
  );
}

function SquareAndInverseDiagonalLine(props: IProps){
  return(
    <button
      className="square">
      <div className='value'>
       {props.value}     
      </div>
      <div className='image'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Location_arithmetic_diagonal.svg/768px-Location_arithmetic_diagonal.svg.png"  width="34px" height="34px"/> 
      </div>
      </button>
  );
}

function SquareAndHorizontalLine(props: IProps){
  return(
    <button
      className="square">
      <div className='value'>
       {props.value}     
      </div>
      <div className='image'>
        <img src="https://image.freepik.com/icones-gratis/linha-horizontal_318-36486.jpg"  width="34px" height="34px"/> 
      </div>
      </button>
  );
}

function SquareAndVerticalLine(props: IProps){
  return(
    <button
      className="square">
      <div className='value'>
       {props.value}     
      </div>
      <div className='image'>
        <img src="http://rost.kg/wp-content/uploads/2017/11/1111111.png"  width="34px" height="34px"/> 
      </div>
      </button>
  );
}


export class Board extends React.Component< {value?:number, 
                                            onClick: (i:number) => void, squares:number[], 
                                            calculateWinner: (squares:number[]) => string | undefined } ,{}> {

    renderSquare(i:number) {
      return ( 
              <Square
                value={this.props.squares[i]}
                onClick={() =>  this.props.onClick(i)}
              /> 
        );
    }
    
    drawHandler(line: string | undefined) {
      switch(line) {
        case '012': 
          return this.draw([0,1,2], this.renderSquareAndHorizontalLine)
  
        case '678': 
          return this.draw([6,7,8], this.renderSquareAndHorizontalLine)
  
        case '345':
          return this.draw([3,4,5], this.renderSquareAndHorizontalLine)
  
        case '246':
          return this.draw([2,4,6], this.renderSquareAndInverseDiagonalLine)
  
        case '048':
          return this.draw([0,4,8], this.renderDiagonalLine)
  
        case '036':
          return this.draw([0,3,6], this.renderSquareAndVerticalLine)
  
        case '147':
          return this.draw([1,4,7], this.renderSquareAndVerticalLine)  
  
        case '258':
          return this.draw([2,5,8], this.renderSquareAndVerticalLine)  
  
        default:
          return this.draw([], () => <></>)
      }
      return;
    }
  
    draw(winnerLine: number[], drawWinner: (idx: number) => JSX.Element) {
      let i = 0;
      let linePartsDraw: JSX.Element[] = [];
      return this.props.squares.map((s: any, idx: number) => {
  
        if (i !== 3) {
          if (winnerLine.filter(wid => wid === idx).length !== 0){
            linePartsDraw[i] = drawWinner(idx);
          } else {
            linePartsDraw[i] = this.renderSquare(idx);
          }
          i++;
        }
  
        if (i === 3) {
          const lineDraw: JSX.Element = <div key={idx} className="board-row">{linePartsDraw}</div>
          linePartsDraw = [];
          i = 0;
          return lineDraw;
        }
  
        return;
      });
    }
    
    renderDiagonalLine = (i:number) =>{
      return(   
         <SquareAndDiagonalLine
                value={this.props.squares[i]}
              /> 
      )
    }
  
    renderSquareAndInverseDiagonalLine = (i:number)=>{
        return(   
          <SquareAndInverseDiagonalLine
                  value={this.props.squares[i]}
                /> 
        )
      }
      
      renderSquareAndHorizontalLine = (i:number) => {
        return(   
           <SquareAndHorizontalLine
                  value={this.props.squares[i]}
                /> 
        )
      }
  
      renderSquareAndVerticalLine = (i:number) =>{
        return(   
           <SquareAndVerticalLine
                  value={this.props.squares[i]}
                /> 
        )
      }
  
      render() {
   
        const winner = this.props.calculateWinner(this.props.squares);
    
        return (
          <div>
            <div className="status">{status}</div>
            <div className="board-row">
              {
                this.drawHandler(winner)
              }
            </div>
          </div>
        );  
      }
    }
    