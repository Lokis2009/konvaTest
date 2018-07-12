import { Injectable } from '@angular/core';

@Injectable()
export class ToolsService {

  constructor() { }

  public removeNull (arr) {
    for (const key in arr) {
      for (const newKey in arr[key]) {
        if (typeof (arr[key][newKey]) !== 'boolean') {
          if (arr[key][newKey] === null) {
            arr[key][newKey] = '';
          }
        }
      }
    }
    return arr;
  }
  public getLanguages (arr) {
    const languages = [];
    for (const key in arr) {
      if (arr[key] !== null &&
        arr[key] !== true &&
        arr[key] !== false &&
        typeof (arr[key]) === 'object') {
        languages.push(key);
      }
    }
    return languages;
  }
}
