import { combineReducers } from 'redux';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, CHANGE_FILTER } from '../constants/todo.constants';
import { SHOW_ALL } from '../constants/filter.constants';

const initialTodos = [
  {
    text: 'finish building this todo list using Redux',
    completed: false
  },
  {
    text: 'don\'t forget to fix the centering, mr. OCD',
    completed: true
  },
  {
    text: 'see why styled-component function is tripping in Chrome',
    completed: false
  },
  {
    text: 'enjoy a glass of wine',
    completed: true
  }
];

export default combineReducers({ todos, visibilityFilter });

function todos(state = initialTodos, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state, {
          text: action.payload,
          completed: false
        }
      ];

    case REMOVE_TODO: {
      const index = action.index;
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    }

    case TOGGLE_TODO: {
      const index = action.index;
      return state.map((todo, i) => {
        if (index === i) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      });
    }

    default:
      return state;
  }
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case CHANGE_FILTER:
      return action.filter;

    default:
      return state;
  }
}