export class DateUtil {

  static format(data:Date){
    let options: Intl.DateTimeFormatOptions[] = [{year: 'numeric'}, {month: '2-digit'}, {day: '2-digit'}];
let joined = DateUtil.join(data, options, '-');
    return joined;
  }


  static formatDate(date:Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

static euroFormatDate(date:Date){
  var d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

if (month.length < 2)
  month = '0' + month;
if (day.length < 2)
  day = '0' + day;

return [day, month, year].join('-');
}

  static join(date:Date, options:Intl.DateTimeFormatOptions[], separator:string) {
    function format(option:Intl.DateTimeFormatOptions) {
       let formatter = new Intl.DateTimeFormat('en', option);
       return formatter.format(date);
    }
    return options.map(format).join(separator);
 }

 static parse(s:string):Date{
  return  new Date(s);
 }
}
