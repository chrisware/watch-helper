
# watch-helper
Companion APIs to Watchmaker "24hr Worlder 6 Zone" watchface

# API

Get the timeszones and offsets for a list of addresses. Uses Google Geocode and Timezone APIs.

```
/api/v1/timezone?address=india&address=singapore&address=UK&key=<GOOGLE_API_KEY>
```

Returns

```javascript
[
  {
    dstOffset: 0,
    rawOffset: 19800,
    status: "OK",
    timeZoneId: "Asia/Calcutta",
    timeZoneName: "India Standard Time",
    abbr: "IST",
    longName: "India",
    shortName: "IN"
  },
  {
    dstOffset: 0,
    rawOffset: 28800,
    status: "OK",
    timeZoneId: "Asia/Singapore",
    timeZoneName: "Singapore Standard Time",
    abbr: "+08",
    longName: "Singapore",
    shortName: "SG"
  },
  {
    dstOffset: 0,
    rawOffset: 0,
    status: "OK",
    timeZoneId: "Europe/London",
    timeZoneName: "Greenwich Mean Time",
    abbr: "GMT",
    longName: "United Kingdom",
    shortName: "GB"
  }
]
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
