import guid from '~vendor/guid'

const scene = {
  size: {
    width: 20,
    height: 20
  },
  objects: [
    {
      "type": "wall",
      "classify": "normal",
      "position": [
        0,
        3
      ]
    },
    {
      "type": "wall",
      "classify": "normal",
      "position": [
        1,
        3
      ]
    },
    {
      "type": "wall",
      "classify": "normal",
      "position": [
        0,
        4
      ]
    },
    {
      "type": "wall",
      "classify": "normal",
      "position": [
        1,
        4
      ]
    },
    {
      "type": "wall",
      "classify": "steel",
      "position": [
        3,
        3
      ]
    },
    {
      "type": "wall",
      "classify": "steel",
      "position": [
        4,
        3
      ]
    },
    {
      "type": "wall",
      "classify": "steel",
      "position": [
        3,
        4
      ]
    },
    {
      "type": "wall",
      "classify": "steel",
      "position": [
        4,
        4
      ]
    },
    {
      "type": "wall",
      "classify": "grass",
      "position": [
        6,
        3
      ]
    },
    {
      "type": "wall",
      "classify": "grass",
      "position": [
        7,
        3
      ]
    },
    {
      "type": "wall",
      "classify": "grass",
      "position": [
        6,
        4
      ]
    },
    {
      "type": "wall",
      "classify": "grass",
      "position": [
        7,
        4
      ]
    },
    {
      "type": "wall",
      "classify": "water",
      "position": [
        9,
        3
      ]
    },
    {
      "type": "wall",
      "classify": "water",
      "position": [
        9,
        4
      ]
    },
    {
      "type": "wall",
      "classify": "water",
      "position": [
        10,
        3
      ]
    },
    {
      "type": "wall",
      "classify": "water",
      "position": [
        10,
        4
      ]
    },
    {
      "type": "tank",
      "classify": "player1",
      "position": [
        6,
        3
      ],
      "direction": "up"
    },
    {
      "type": "tank",
      "classify": "player2",
      "position": [
        8,
        10
      ]
    }
  ]
};
scene.objects.map(item => item.id = guid());
export default scene;