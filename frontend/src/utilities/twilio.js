import { createLocalTracks, connect, LocalVideoTrack } from "twilio-video";

function startStreaming(jwt, room_name, myFaceVideo) {
	return new Promise((resolve, reject) => {
		connect(jwt, { name: room_name }).then((room) => {
			console.log("joined the room ", room);

			let LocalAudioVideoTrack = createLocalTracks({
				audio: true,
				video: { width: 640, height: 640 },
			});
			let screenSharingTrack = navigator.mediaDevices.getDisplayMedia();

			Promise.all([LocalAudioVideoTrack, screenSharingTrack])
				.then(([localTracks, stream]) => {
					//prendo la track dello screen sharing
					let screenTrack = new LocalVideoTrack(stream.getTracks()[0]);

					screenTrack.contentHint = "capture";

					//unisco le tracks
					const tracks = [...localTracks, screenTrack];

					//vedere la preview
					const localVideoTrack = localTracks[1];
					myFaceVideo.current.appendChild(localVideoTrack.attach());

					//mando a twilio le tracks

					return connect(jwt, {
						name: "{{$room_name}}",
						tracks: tracks,
					});
				})
				.then((room) => {
					console.log("local Track with VA connected to room: ", room.name);

					room.on("participantConnected", (participant) => {
						console.log("A participant connected ", participant);
					});

					room.on("disconnected", (room) => {
						console.log("disconnected from ", room.name);
						LocalAudioVideoTrack.then((tracks) => {
							tracks.forEach((track) => {
								track.stop();
								console.log("track stopped ", track);

								const attachedElements = track.detach();
								console.log("Element disconected, ", attachedElements);

								attachedElements.forEach((element) => {
									element.remove();
									console.log("element removed", element);
								});
							});
						});
					});
					resolve("ok");
				})
				.catch((e) => {
					console.log("you must allow screen sharing");
					console.log(e);
					reject("share screen refused");
				});
		});
	});
}

function joinStreaming(
	jwt,
	room_name,
	StreamerVideoStarted,
	streamerFaceStarted,
	streamClosed
) {
	return new Promise((resolve, reject) => {
		console.log(jwt, room_name, " connect");

		connect(jwt, { name: room_name, audio: false, video: false })
			.then((room) => {
				console.log("joined the room ", room);

				//gestire i partecipanti già collegati
				room.on("participantConnected", (participant) => {
					console.log("A new participant joined the room, ", participant);
				});

				room.on("participantDisconnected", (participant) => {
					console.log("A participant disconnect, ", participant);
				});

				room.participants.forEach((participant) => {
					console.log("participant connected ", participant.identy);

					//ci interessa solo chi trasmette lo streaming
					if (participant.identy !== room_name) return;

					participant.on("trackSubscribed", (track) => {
						track.on("started", (track) => {
							const isVideo = track.kind === "video";
							const isBigVideo = isVideo && track.dimensions.width >= 700;

							if (isBigVideo) {
								StreamerVideoStarted(track);
							} else {
								streamerFaceStarted(track);
							}
						});
					});

					participant.on("trackUnsubscribed", (track) => {
						console.log("trackUnsubscribed ", track);

						//lo streamer chiude
						const attachedElements = track.detach();
						attachedElements.forEach((element) => element.remove());
					});
				});

				room.on("disconnected", (room) => {
					console.log("room disconnected ", room);
					streamClosed();
				});
			})
			.catch((error) => {
				console.log("unable to connect room.", error.message);
			});
	});
}

export { startStreaming, joinStreaming };
