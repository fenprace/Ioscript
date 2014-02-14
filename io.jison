%lex

%x COMMENT STRING

%%

<<EOF>>                 return 'EOF'
 
<INITIAL>\#             this.begin('COMMENT');
<COMMENT>.              /* do nothing */
<COMMENT>\n             this.begin('INITIAL');


<INITIAL>'"'            {
                            this.begin('STRING');
                            yy.current_str = "";
                        }
<STRING>'"'             {
                            this.begin('INITIAL');
                            return 'String';
                        }
<STRING>.               { yy.current_str += yytext; }
<STRING>\n              { yy.current_str += yytext; }


(\:|\.|\'|\~|\!|\@|\$|\%|\^|\&|\*|\-|\+|\/|\=|\||\\|\<|\>|\?)+ {
    return 'Operator';
}

","                     return ',';
"("                     return '(';
")"                     return ')';
"["                     return '[';
"]"                     return ']';
"if"                    return 'IF';

[0-9]+                  return 'Integer';
[0-9]+("."[0-9]+)\b     return 'Float';
[a-zA-Z_][a-zA-Z0-9_]*  return 'Name';

";"                     return ';';
\n                      return 'LF';

[ \f\t\r]*              /* skip */

/lex

%start file

%%

file
    : expressions EOF
    ;

Term
    : ';' LF
    | ';'
    | LF
    ;

Identifier
    : Name
    | Operator
    ;

List
    : '[' ']'
        { $$ = yy.env.List.create([]); }
    | '[' list_content ']'
        { $$ = yy.env.List.create($list_content); }
    ;

list_content
    : expression {
        $$ = [$expression];
    }
    | list_content ',' expression {
        $$ = $list_content;
        $list_content.push($expression);
    }
    ;

expressions
    : expressions expression
    | expression
    ;

expression
    : e Name {
        $$ = $1.get($2).apply($1);
    }
    | e Operator expression {
        if ($Operator == ":=") {
            yy.env[$e] = $expression;
            return $expression;
        }
    }
    | IF '(' expression ')' {
        $$ = yy.env.Boolean.create($expression);
    }
    | e
    ;

e
    : Integer
        { $$ = yy.env.Integer.create(yytext); }
    | Float
        { $$ = yy.env.Float.create(yytext); }
    | String
        { $$ = yy.env.String.create(yy.current_str); }
    | Name {
        n = yy.env[$Name];
        if (n === undefined) {
            $$ = $Name;
        } else {
            $$ = n;    
        }
    }
    | List
    }
    ;