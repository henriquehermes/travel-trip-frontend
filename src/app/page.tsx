"use client"

import React from "react"
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"

const containerStyle = {
	width: "100vw",
	height: "100vh",
}

const center = {
	lat: -3.745,
	lng: -38.523,
}

function MyComponent() {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyDsTs45wY-HG7vAlPYwGiRgnW0KV72qjkk",
	})

	const [map, setMap] = React.useState(null)

	const onUnmount = React.useCallback(function callback() {
		setMap(null)
	}, [])

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={{
				lat: -31.95819035442703,
				lng: 115.86647070477927,
			}}
			zoom={10}
			onUnmount={onUnmount}
		>
			<Marker
				onDraggableChanged={() => {}}
				options={{
					draggable: true,
				}}
				position={{
					lat: -31.95819035442703,
					lng: 115.86647070477927,
				}}
			/>
			{/* Child components, such as markers, info windows, etc. */}
		</GoogleMap>
	) : (
		<></>
	)
}

export default React.memo(MyComponent)
