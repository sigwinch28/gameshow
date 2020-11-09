import React from 'react';
import './App.css';

type TileProps = { value: string; selected: boolean };

const colors = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA"];

// const randomDifferentIndex = (length: number, current: number) => {
//     if (length > 1) {
//         let i = Math.floor(Math.random() * (length - 1))
//         if (i === current) { i++ }
//         return i
//     } else {
//         return Math.floor(Math.random() * length)
//     }
// }

// const randomDifferentElem = (array: any[], current: number) => array[randomDifferentIndex(array.length, current)]

const randomIndex = (length: number) => Math.floor(Math.random() * length);
const randomElem = (array: any[]) => array[randomIndex(array.length)];

const Tile: React.FC<TileProps> = ({ value, selected }) => {
    const [backgroundColor, setBackgroundColor] = React.useState<string>(randomElem(colors))

    const className = selected ? "Tile Selected" : "Tile"

    React.useLayoutEffect(() => {
        setBackgroundColor(randomElem(colors));
    }, [setBackgroundColor, value])

    return (
        <div style={{ backgroundColor: backgroundColor }} className={className}>
            <div className="TileContent">
                {value}
            </div>
        </div>
    )
}


// class Tile extends React.Component<TileProps, TileState> {
//     constructor(props: TileProps) {
//         super(props);
//         let i = Math.floor(Math.random() * colors.length);
//         this.state = {
//             color: colors[i],
//         }
//     }

//     render = () =>
//         <div style={{ backgroundColor: this.state.color }} className="Tile" >
//             <div className="Content">
//                 {this.props.value}
//             </div>
//         </div >

//     componentDidUpdate(oldProps: TileProps) {
//         if (oldProps.value !== this.props.value) {
//             this.setState((state, props) => {
//                 let i = Math.floor(Math.random() * colors.length);
//                 let color = colors[i];
//                 return { color: color };
//             })

//         }
//     }
// }

export default Tile;
