let a, b, c;
a = 1;
b = 1;
c = -10;
let d = (b ** 2)-4*a*c;
if (d<0) {
    console.log("nothing");
}
else if (d=0) {
    console.log((b*(-1))/(2*a));
}
else {
    console.log((b*(-1)+Math.sqrt((b**2)-(4*a*c)))/(2*a))
    console.log((b*(-1)+Math.sqrt((b**2)+(4*a*c)))/(2*a))
}
