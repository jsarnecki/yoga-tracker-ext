const Innertube = require('youtubei.js');

// async function testFunc(details) {
//   const youtube = await new Innertube({ gl: 'US' }); // all parameters are optional.
//   const test = await youtube.getDetails(details);
//   return test;
// }

// (async () => {
//   const result = await testFunc("vYLyyuQByBc");
//   console.log(result.metadata.length_seconds);
// })();

async function getPlaylist(id) {
  const youtube = await new Innertube({ gl: 'US' }); // all parameters are optional.
  const playlist = await youtube.getPlaylist(id, { client: 'YOUTUBE' });
  for (let video of playlist.items) {
    let duration = video.duration.seconds;
    let mins = Math.trunc(duration / 60);
    let seconds = Math.round(((duration / 60) - mins) * 60);
    console.log(`Title: ${video.title}`);
    console.log(`Is ${mins} minutes and ${seconds} seconds\n`);
  }
}

getPlaylist("PLm1EmVGs7R48ivm60PgwV26ZedNoPzg6p");