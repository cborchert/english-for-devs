migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2023-01-19 14:51:33.717Z",
      "updated": "2023-01-19 17:30:33.284Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpg",
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null
          }
        },
        {
          "system": false,
          "id": "ydatfywf",
          "name": "role",
          "type": "select",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "editor"
            ]
          }
        }
      ],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    },
    {
      "id": "1l4s2xd27kkgufc",
      "created": "2023-01-19 17:00:29.715Z",
      "updated": "2023-02-17 07:01:22.052Z",
      "name": "questions",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "wtbyu0ze",
          "name": "published",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "3f43o3wl",
          "name": "title",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "e8baka3o",
          "name": "question",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "crqpu4e8",
          "name": "questionType",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "multipleChoice",
              "freeResponse",
              "assistedResponse"
            ]
          }
        },
        {
          "system": false,
          "id": "qrokeqdj",
          "name": "options",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "tedfixhc",
          "name": "answers",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "zcvgxgqc",
          "name": "responseAudioScript",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "nteikpcz",
          "name": "responseAudioUrl",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "piinkwy0",
          "name": "responseAudioUrlTextSource",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "listRule": "@request.auth.id != \"\" && @request.auth.verified = true && (published = true || @request.auth.role = \"editor\")",
      "viewRule": "@request.auth.id != \"\" && @request.auth.verified = true && (published = true || @request.auth.role = \"editor\")",
      "createRule": "@request.auth.id != \"\" && @request.auth.verified = true && @request.auth.role = \"editor\"",
      "updateRule": "@request.auth.id != \"\" && @request.auth.verified = true && @request.auth.role = \"editor\"",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.verified = true && @request.auth.role = \"editor\"",
      "options": {}
    },
    {
      "id": "6qtlibuzef7yjy1",
      "created": "2023-02-01 18:28:52.805Z",
      "updated": "2023-02-01 23:28:54.350Z",
      "name": "chapters",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "arx348bg",
          "name": "published",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "cuhfxgt1",
          "name": "slug",
          "type": "text",
          "required": true,
          "unique": true,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "wkujczgf",
          "name": "title",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "inqigrie",
          "name": "description",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "r4olafgo",
          "name": "chapterType",
          "type": "select",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "lesson",
              "exercise"
            ]
          }
        },
        {
          "system": false,
          "id": "l7wbqtmz",
          "name": "content",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "rkynyasg",
          "name": "questions",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": null,
            "collectionId": "1l4s2xd27kkgufc",
            "cascadeDelete": false
          }
        }
      ],
      "listRule": "@request.auth.id != \"\" && @request.auth.verified = true && (published = true || @request.auth.role = \"editor\")",
      "viewRule": "@request.auth.id != \"\" && @request.auth.verified = true && (published = true || @request.auth.role = \"editor\")",
      "createRule": "@request.auth.id != \"\" && @request.auth.verified = true && @request.auth.role = \"editor\"",
      "updateRule": "@request.auth.id != \"\" && @request.auth.verified = true && @request.auth.role = \"editor\"",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.verified = true && @request.auth.role = \"editor\"",
      "options": {}
    },
    {
      "id": "85vy7xxc0cm8qkf",
      "created": "2023-02-01 18:29:23.790Z",
      "updated": "2023-02-01 21:48:57.676Z",
      "name": "modules",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "0ix3dbyb",
          "name": "published",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "sg3qk6k7",
          "name": "title",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "amd0tn1v",
          "name": "subtitle",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "3gdibtjo",
          "name": "description",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "oqtnem6l",
          "name": "chapters",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": null,
            "collectionId": "6qtlibuzef7yjy1",
            "cascadeDelete": false
          }
        }
      ],
      "listRule": "@request.auth.id != \"\" && @request.auth.verified = true && (published = true || @request.auth.role = \"editor\")",
      "viewRule": "@request.auth.id != \"\" && @request.auth.verified = true && (published = true || @request.auth.role = \"editor\")",
      "createRule": "@request.auth.id != \"\" && @request.auth.verified = true && @request.auth.role = \"editor\"",
      "updateRule": "@request.auth.id != \"\" && @request.auth.verified = true && @request.auth.role = \"editor\"",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.verified = true && @request.auth.role = \"editor\"",
      "options": {}
    },
    {
      "id": "ch8p0v1ea82q1jj",
      "created": "2023-02-01 18:39:58.385Z",
      "updated": "2023-02-01 21:54:41.431Z",
      "name": "courses",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "my91oevz",
          "name": "published",
          "type": "bool",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "cwumuucq",
          "name": "slug",
          "type": "text",
          "required": false,
          "unique": true,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "pejxhgcz",
          "name": "title",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "ahofgzfx",
          "name": "description",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "5doqbpd8",
          "name": "modules",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": null,
            "collectionId": "85vy7xxc0cm8qkf",
            "cascadeDelete": false
          }
        }
      ],
      "listRule": "@request.auth.id != \"\" && @request.auth.verified = true && (published = true || @request.auth.role = \"editor\")",
      "viewRule": "@request.auth.id != \"\" && @request.auth.verified = true && (published = true || @request.auth.role = \"editor\")",
      "createRule": "@request.auth.id != \"\" && @request.auth.verified = true && @request.auth.role = \"editor\"",
      "updateRule": "@request.auth.id != \"\" && @request.auth.verified = true && @request.auth.role = \"editor\"",
      "deleteRule": "@request.auth.id != \"\" && @request.auth.verified = true && @request.auth.role = \"editor\"",
      "options": {}
    },
    {
      "id": "wlov4fu5ko33aa5",
      "created": "2023-02-01 20:52:11.167Z",
      "updated": "2023-02-01 23:27:59.140Z",
      "name": "progress",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "08cfsvhl",
          "name": "user",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false
          }
        },
        {
          "system": false,
          "id": "v0ms7piz",
          "name": "chapter",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "collectionId": "6qtlibuzef7yjy1",
            "cascadeDelete": false
          }
        },
        {
          "system": false,
          "id": "k76kummi",
          "name": "completedQuestions",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": null,
            "collectionId": "1l4s2xd27kkgufc",
            "cascadeDelete": false
          }
        },
        {
          "system": false,
          "id": "saa6cs9d",
          "name": "percentComplete",
          "type": "number",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        }
      ],
      "listRule": "@request.auth.id != \"\" && @request.auth.verified = true && user.id = @request.auth.id",
      "viewRule": "@request.auth.id != \"\" && @request.auth.verified = true && user.id = @request.auth.id",
      "createRule": "@request.auth.id != \"\" && @request.auth.verified = true",
      "updateRule": "@request.auth.id != \"\" && @request.auth.verified = true",
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "zwkhkzx3cer0yyo",
      "created": "2023-02-01 20:53:36.907Z",
      "updated": "2023-02-03 11:16:08.807Z",
      "name": "mastery",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "jtyhhiux",
          "name": "user",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false
          }
        },
        {
          "system": false,
          "id": "uugaiaw2",
          "name": "question",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "collectionId": "1l4s2xd27kkgufc",
            "cascadeDelete": false
          }
        },
        {
          "system": false,
          "id": "2d6wxkuh",
          "name": "ease",
          "type": "number",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        },
        {
          "system": false,
          "id": "o2esbgzo",
          "name": "interval",
          "type": "number",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        },
        {
          "system": false,
          "id": "qpwzyiup",
          "name": "attempts",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "f2zu4rer",
          "name": "nextScheduledAttempt",
          "type": "date",
          "required": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        }
      ],
      "listRule": "@request.auth.id != \"\" && @request.auth.verified = true && user.id = @request.auth.id",
      "viewRule": "@request.auth.id != \"\" && @request.auth.verified = true && user.id = @request.auth.id",
      "createRule": "@request.auth.id != \"\" && @request.auth.verified = true",
      "updateRule": "@request.auth.id != \"\" && @request.auth.verified = true",
      "deleteRule": null,
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
