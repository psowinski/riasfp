### Functional programming library integrated with immutable.js

Provides Result and Option monads and unit const based on record type

### Result:

import { ok, error } from 'riasfp'

ok(1); // Ok(1)\
ok(undefined); //Error exception\
ok(null); //Error exception

error('some value'); // Error('some value')\
error(undefined); //Error exception\
error(null); //Error exception

methods:\
.map(function(okValue) {...})\
.bind(function(okValue) {...})\
.tee(function(okValue) {...})\
.match({ok: function(okValue) {...}, error: function(errorValue) {...})
.mapError(function(errorValue) {...})\
.bindError(function(errorValue) {...})\
.teeError(function(errorValue) {...})\
.isOk()\
.isError()\
.toString()

### Option:

import { some, none } from 'riasfp'

none; //None

some(1); //Some(1)\
some(undefined); //Error exception\
some(null); //Error exception

option(1); //Some(1)\
option(undefined); //none\
option(null); //none

methods:\
.map(function(okValue) {...})\
.bind(function(okValue) {...})\
.tee(function(okValue) {...})\
.match({some: function(value) {...}, none: function() {...})\
.isOk()\
.isError()

### Unit:

import { unit } from 'riasfp'

unit; //Unit
