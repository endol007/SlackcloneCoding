import React from "react";
import styled from "styled-components";

const Grid =(props) => {
    const { color,
            is_center,
            width,
            min_width,
            padding,
            margin,
            background,
            position,
            height,
            display,
            _onClick
    } = props;
    const styles = {
        is_center: is_center,
        width: width,
        min_width: min_width,
        padding: padding,
        margin: margin,
        background: background,
        position: position,
        color: color,
        height: height,
        display: display
    };
    return (
        <React.Fragment>
            <GridBox
                {...styles}
                onClick={_onClick}
            ></GridBox>
        </React.Fragment>
    )
}
Grid.defaultProps={
    children: null,
    is_center: false,
    width: false,
    min_width: false,
    padding: false,
    margin: false,
    background: false,
    position: false,
    color: false,
    height:  false,
    display: false,
    _onClick: () => {},
}

const GridBox = styled.div`
    color: ${(props) => props.color};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    min_width: ${(props) => props.min_width};
    box-sizing: border-box;
    display: ${(props) => props.display};
    position: ${(props) => props.position};
    padding: ${(props) => props.padding};
    margin: ${(props) => props.margin};
    background: ${(props) => props.backgournd};
    ${(props) =>
        props.is_center
          ? `display: block; text-align: center; align-items: center; justify-content:space-between`
          : ""}


`;

export default Grid;