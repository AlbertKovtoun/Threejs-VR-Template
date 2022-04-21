uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec2 vUv;
varying float vRandom;

void main()
{
	//Normal circles
    // vec2 xy = gl_PointCoord.xy - vec2(0.5);
    // float ll = length(xy);
    // float alpha = step(ll, 0.5);

	//Fading circles
	float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
	float alpha = 0.05 / distanceToCenter - 0.1;

	//Random Colors
	vec3 color;

	if(vRandom > 0.5) 
	{
		color = uColor1;
	}

	else  
	{
		color = uColor2;
	}

    gl_FragColor = vec4(color, alpha);
}