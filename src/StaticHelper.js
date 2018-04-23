import React from "react";

class StaticHelper extends React.Component {
    static getRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}

export default StaticHelper;