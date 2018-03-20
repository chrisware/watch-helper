
# watch-helper
Companion APIs to Watchmaker "24hr Worlder 6 Zone" watchface

# API

Get the timeszones and offset for a list of addresses. Uses Google Geocode and Timezone APIs.

```
/api/v1/timezone?address=india,singapore&key=<GOOGLE_API_KEY>
```

Returns

```javascript
{
  dstOffset: 0,
  rawOffset: 28800,
  status: "OK",
  timeZoneId: "Asia/Singapore",
  timeZoneName: "Singapore Standard Time",
  abbr: "+08",
  longName: "3",
  shortName: "3"
}
```

# Development

```
$ sls offline
```

# Deployment
```
$ sls deploy
```

# Testing
```

```
