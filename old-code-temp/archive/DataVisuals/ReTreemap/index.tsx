/* eslint-disable */
import React, { PureComponent } from 'react';
import {
	Treemap,
	ResponsiveContainer
} from 'recharts';



const ReTreemap = ({ data }) => {
    return (
		<ResponsiveContainer width="100%" height="100%">
			<Treemap
				width={730}
				height={250}
				data={data}
				dataKey="size"
				stroke="#fff"
				fill="#8884d8"
			/>
		</ResponsiveContainer>
    );
}

export default ReTreemap;