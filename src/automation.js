import { template } from './template';
import Mustache from 'mustache';

class PostUploadAutomator {
  constructor() {
    // initialize instance variables
    this.fileData = {};
    this.parsedData = {};
    this.matchedAlbum = {};
    this.lookupData = {};
    this.albumSongs = {};
  }
}

const invokeHook = async (env, payload) => {
  const token = env.SECRET_TOKEN;
  const req = new Request(
    `https://placeholder/api/records`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`,
      })
    });
  const response = await env.ptdb.fetch(req);
  const responseJson = await response.json();
  return responseJson;
}

const getForumId = (lang, genre, num_of_tracks) => {
  let forumId = 45;

  if (lang === 'KR' || lang === 'JP') {
    forumId = 59;
  } else if (lang === 'CN') {
    forumId = 56;
  }

  if (genre.includes('Soundtrack') || genre.includes('Original Score')) {
    forumId = 86;
  } else if (genre.includes('Classical')) {
    forumId = 34;
  }

  if (forumId === 45 && num_of_tracks > 0 && num_of_tracks <= 3) {
    forumId = 12;
  }

  return forumId;
}

const getTypeID = (forumId, albumGenre, numOfTracks) => {
  const genreList = {
    'Alternative Indie Songwriter Psychedelic': 86,
    'R&B Soul': 90,
    'Hip-Hop Rap': 91,
    'Pop': 83,
    'Rock Metal Punk Ska': 84,
    'Dance House Trance': 87,
    'Electronic': 88
  };

  let typeId = 89;

  if (forumId === 45) {
    for (const genreGroup in genreList) {
      const genres = genreGroup.split(' ');
      if (genres.some(genre => albumGenre.includes(genre))) {
        typeId = genreList[genreGroup];
        break;
      }
    }
  }

  if (forumId === 59) {
    typeId = 66;
    if (numOfTracks > 0 && numOfTracks <= 3) {
      typeId = 67;
    } else if (numOfTracks > 3 && numOfTracks <= 6) {
      typeId = 68;
    }
  }

  return typeId;
}

const getForumIdAndTypeId = (lang, genre, num_of_tracks) => {
  const forumId = getForumId(lang, genre, num_of_tracks);
  const typeId = getTypeID(forumId, genre, num_of_tracks);

  return { forumId, typeId };
}

export const pdify = async (env, options, postParams) => {
  const cdb_auth = env.cdb_auth;
  const body = { cdb_auth, options, postParams};
  let action;
  if (options.pid && options.tid) {
    // Edit
    action = 'edit';
  } else if (options.tid) {
    action = 'reply';
  } else if (options.fid) {
    action = 'create';
  } else {
    throw new Error('Unspecified fid / tid / pid');
  }

  const req = new Request(
    `https://placeholder/api/${action}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({"Content-Type": "application/json"})
    });
  const response = await env.pdify.fetch(req);
  const responseJson = await response.json();
  return responseJson;
}

export const queryEnigma = async (env, query, id=null) => {
  try {
    let req = new Request(
      'https://placeholder/', {
        method: 'POST',
        body: JSON.stringify({ query, id }),
        headers: new Headers({"Content-Type": "application/json",})
      });
    let response = await env.enigma.fetch(req);
    const { matchedAlbum } = await response.json();

    if (!matchedAlbum) {
      throw new Error('No match on iTunes');
    }

    req = new Request(
      'https://placeholder/', {
        method: 'POST',
        body: JSON.stringify({ id: matchedAlbum.collectionId }),
        headers: new Headers({"Content-Type": "application/json",})
      });
    response = await env.enigma.fetch(req);

    const { lookupData, albumSongs } = await response.json();

    return { lookupData, albumSongs };
  } catch (error) {
    throw error;
  }
};

const parse_release_name = async ( release_name ) => {
  const regexPattern = /^(?<artist>.*?)-{1,2}(?<title>.*?)(?:[-_]\((?<catalogNumber>\w+\d+\w*)\))?(?:-(?<additionalTags>Bootleg|BOOTLEG|DIRFIX|REPACK|REAL_PROPER|PROPER|S[iI]NGLE|OST|[a-zA-Z_]*(?:Boxset|BOXSET)))*(?:-\(?(?<format>CD|(?!CPOP\b)\w{3,}(?<!\d))\)?)?(?:-(?<language>CPOP|[A-Z]{2}))?-(?<year>\d{4}|x{4})-(?<group>[^-]{1,15})$/;
  const regex = new RegExp(regexPattern);
  const match = release_name.match(regex);

  if (!match) {
    throw new Error('Not a valid scene release name');
  }

  const parsedRelease = { ...match.groups };

  for (const key in parsedRelease) {
    const value = parsedRelease[key];
    if (value) {
      parsedRelease[key] = value.replace(/[-_]/g, " ");
    }
  }

  // Sensible conversions
  if (parsedRelease.artist === 'VA') {
    parsedRelease.artist = 'Various Artists';
  }

  if (parsedRelease.language === 'CPOP') {
    parsedRelease.language = 'CN';
  }

  if (!parsedRelease.format) {
    parsedRelease.format = 'CD';
  }

  // const {
  //   artist,
  //   title,
  //   catalogNumber,
  //   additionalTags,
  //   format,
  //   language,
  //   year,
  //   group 
  // } = parsedRelease;

  return parsedRelease;
};

const processKeyValuePair = (input) => {
  // Define an array with keys to keep untouched

  let untouchedKeys;
  if (input.wrapperType === 'collection') {
    untouchedKeys = [
      'artistName',
      'collectionName',
      'artworkUrl100',
      'trackCount',
      'copyright',
      'country',
      'releaseDate',
      'primaryGenreName',
    ];
  } else if (input.wrapperType === 'track'){
    untouchedKeys = [
      'artistName',
      'trackName',
      'previewUrl',
      'artworkUrl100',
      'discCount',
      'discNumber',
      'trackCount',
      'trackNumber',
      'trackTimeMillis',
    ];
  } else {
    throw new Error('Cannot process type of neither collection nor track')
  }

  // Initialize the output object
  const output = {};

  // Loop through the input object and process key-value pairs
  Object.entries(input).forEach(([key, value]) => {
    if (untouchedKeys.includes(key)) output[key] = value;
    if (key === 'artworkUrl100') 
      output[key] = value.replace('100x100bb.jpg', '800x800bb.jpg');
    if (key === 'releaseDate') {
      const date = new Date(value);
      output[key] = date.toLocaleDateString('en-GB');
    }
  });

  return output;
};

export const handleIncoming = async ( env, fileMeta ) => {
  const data = {};    // consists of all data prep for render
  const toSend = {};  // payload to send to webhook

  try {
    data.fileMeta = fileMeta;
    toSend.fileName = data.fileMeta.file_name;
    toSend.fileSize = data.fileMeta.file_size;
    toSend.preName = data.fileMeta.pre_name;
    toSend.downloadLinks = data.fileMeta.download_urls;

    // Step 1: Parse the release name
    data.parsed = await parse_release_name(fileMeta.pre_name);
    toSend.sourceFormat = data.parsed.format;
    toSend.primaryLanguage = data.parsed.language;

    // Step 2: Query album info
    const matched = await queryEnigma(env, `${data.parsed.artist} ${data.parsed.title}`);
    if (matched) {
      data.matched = {};
      data.matched.lookupData = processKeyValuePair(matched.lookupData);
      data.matched.albumSongs = matched.albumSongs.map( (v) => processKeyValuePair(v) );
    }
    toSend.collectionId = matched.lookupData.collectionId.toString();

    // Step 3: Render html to string
    const rendered = Mustache.render(template, data);
    
    // Step 4: Post
    const { forumId, typeId } = getForumIdAndTypeId(
      data.parsed.language,
      data.matched.lookupData.primaryGenreName,
      data.matched.lookupData.trackCount
    );

    const posted = await pdify(
      env,
      {
        fid: forumId,
      },
      { 
        subject: `${data.matched.lookupData.artistName} - ${data.matched.lookupData.collectionName} (${data.matched.lookupData.releaseDate.slice(-4)})`,
        message: rendered,
        typeid: typeId,
      },
    );

    if (posted.success) {
      toSend.tid = posted.value.tid;
      toSend.pid = posted.value.pid;
    } else {
      throw new Error('Post failed')
    }

    // All done. Invoke webhook
    const hooked = await invokeHook(env, toSend);

    return hooked;
  }
  catch (e) {
    // Cannot parse and/or no match
    // Invoke hook directly

    const resp = await invokeHook(env, toSend);
    
    console.log(e);
    throw e;
  }
}