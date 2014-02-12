%lex

%%

\-?[0-9]+              return 'INTEGER';
\-?[0-9]+("."[0-9]+)   return 'FLOAT';

[a-zA-Z_][a-zA-z0-9_]* { return 'IDENTIFIER'; }

("!"|"@"|"#"|"$"|"%"|"^"|"&"|"*"|"("|")"|"-"|"_"|"+"|"="|"{"|"}"|"["|"]"|":"|";"|"\""|"'"|"<"|">"|"."|"?"|"|")+       return 'OPERATOR'

"("                   return '(';
")"                   return ')';
"["                   return '[';
"]"                   return ']';
"!"                   return '!';

\s+                   /* skip */
";"                   return ';';
\n                    return 'LF';
<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence 

%left '+' '-'
%left '*' '/'
%left '^'

*/

%start expression_list

%%

end
    : ';' LF
    | LF
    | ';'
    | EOF
    ;

term
    : IDENTIFIER {
        $$ = new yy.Identifier(yytext);
    }
    | INTEGER {
        $$ = new yy.Integer(yytext);
    }
    | FLOAT {
        $$ = new yy.Float(yytext);
    }
    ;

argument_list
    : expression
    | argument_list ',' expression
    ;
    
expression_list
    : expression_list expression
    | expression
    ;

expression
    : term IDENTIFIER end {
        $$ = $term.value()[$2]();
    }
    | term IDENTIFIER argument_list end {
    }
    | term OPERATOR end {
        $$ = $term.value()[$2]();
    }
    | term OPERATOR argument_list end
    ;