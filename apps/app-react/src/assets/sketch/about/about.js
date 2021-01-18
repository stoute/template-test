import React from "react";

export const About = (props) => {
   return (<div style={{display:"inline"}} className={"sketch-container sk-about " + props.className }>
<svg onClick={props.onClick} width="345px" height="257px" viewBox="0 0 345 257" version="1.1" xmlns="http://www.w3.org/2000/svg" >
    
    <title>about</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="about" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="section-2">
            <rect id="action-showInfo" stroke="#C5C9CD" fill="#F8F9FA" x="0.5" y="0.5" width="344" height="256" rx="38"></rect>
            <text id="app-react" fontFamily="OpenSans-Bold, Open Sans" fontSize="24" fontWeight="bold" fill="#F56F23">
                <tspan x="115.777344" y="133">app-react</tspan>
            </text>
            <text id="app-template" fontFamily="OpenSans-Bold, Open Sans" fontSize="14" fontWeight="bold" fill="#4A4A4A">
                <tspan x="126.078125" y="175">app template</tspan>
                <tspan x="173" y="194"></tspan>
                <tspan x="173" y="213"></tspan>
                <tspan x="173" y="232"></tspan>
            </text>
            <g id="icon-html-className=hidden-delay=3000" transform="translate(141.000000, 39.000000)" fill="#F56F23">
                <path d="M20.0010932,39.3521162 C20.4558623,38.8974977 20.4558623,38.1980847 20.0010932,37.7434662 L6.25307461,24 L20.0010932,10.2565338 C20.4558623,9.80191533 20.4558623,9.10250229 20.0010932,8.64788381 L18.2519814,6.89935122 C17.7972124,6.44473274 17.0975676,6.44473274 16.6427986,6.89935122 L0.341076797,23.195675 C-0.113692266,23.6502935 -0.113692266,24.3497065 0.341076797,24.804325 L16.6427986,41.1006488 C17.0975676,41.5552673 17.7972124,41.5552673 18.2519814,41.1006488 L20.0010932,39.3521162 Z M40.6755944,2.0384306 C40.8505056,1.44392952 40.5006832,0.814457788 39.9059852,0.639604529 L37.7370866,0.0451034465 C37.1773709,-0.129749813 36.5476906,0.219956706 36.3727794,0.814457788 L23.3244056,45.9615694 C23.1494944,46.5560705 23.4993168,47.1855422 24.0940148,47.3603955 L26.2629134,47.9548966 C26.8226291,48.1297498 27.4523094,47.7800433 27.6272206,47.1855422 L40.6755944,2.0384306 Z M63.6589232,24.804325 C64.1136923,24.3497065 64.1136923,23.6502935 63.6589232,23.195675 L47.3572014,6.89935122 C46.9024324,6.44473274 46.2027876,6.44473274 45.7480186,6.89935122 L43.9989068,8.64788381 C43.5441377,9.10250229 43.5441377,9.80191533 43.9989068,10.2565338 L57.7469254,24 L43.9989068,37.7434662 C43.5441377,38.1980847 43.5441377,38.8974977 43.9989068,39.3521162 L45.7480186,41.1006488 C46.2027876,41.5552673 46.9024324,41.5552673 47.3572014,41.1006488 L63.6589232,24.804325 Z" id="ÔÑ°"></path>
            </g>
            <text id="v-version" fontFamily="OpenSans-Bold, Open Sans" fontSize="12" fontWeight="bold" fill="#4A4A4A">
                <tspan x="150.044922" y="213">v-{props.version} </tspan>
            </text>
        </g>
    </g>
</svg></div>)
}