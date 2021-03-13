
export default class Tdr {
    constructor({ 
        el: appQuerySelector,
        data,
        template,
        methods
    }) {
        this.data = data()
        this.template = template
        this.$methods = {}

        for ( const method in methods ) {
            this.$methods[ method ] = methods[ method ]
        }

        this.elementRefs = {}

        this.appElement = document.querySelector( appQuerySelector )
        this.appElement.innerHTML = template

        this.$data = new Proxy( this.data, this.proxyDataHandler( this ) )

        traverseHtmlElements( this.appElement, element => {
            handleInterpolation( this, element ) 
            handleEvendBindings( this, element ) 
        })
        
        this.appElement.__tdr__ = this
    }

    proxyDataHandler( vm ) {
        return {
            set( target, dataKey, dataValue ) {
                const elementRef = vm.elementRefs[ dataKey ]
                if ( !elementRef ) return
            
                for ( const elementUid in elementRef ) {
                  const element = elementRef[ elementUid ]
                  element.innerHTML = dataValue
                }

                target[ dataKey ] = dataValue

                return true
            }
        }
    }
}

//////////////

function traverseHtmlElements( element, handleElementFn ) {
    if ( element.children.length ) {
      for ( const childElement of element.children ) {
        traverseHtmlElements( childElement, handleElementFn )
      }
    }
  
    handleElementFn( element )
}

//////////////
  
function handleInterpolation( vm, element ) {
    const { innerHTML: elementHtml } = element
    const interpolationGenerator = createInterpolationIteration( elementHtml )

    while ( true ) {
        const { value: dataKey, done } = interpolationGenerator.next()
        if ( done ) break

        if ( !vm.elementRefs[ dataKey ] ) {
            vm.elementRefs[ dataKey ] = {}
        } 

        element.innerHTML = vm.data[ dataKey ]
        vm.elementRefs[ dataKey ][ generateUid() ] = element
    }
}
  
function handleEvendBindings( vm, element ) {
    const clickEventMethod = element.getAttribute( '@click' )
    if ( !clickEventMethod ) return

    element.addEventListener( 'click', event => {
        const methodToCall = vm.$methods[ clickEventMethod ].bind( vm )
        methodToCall( event )
        
        element.removeAttribute( '@click' )
    })
}

//////////////

function* createInterpolationIteration( elementHtml ) {
    const regex = RegExp( /\{\{\s*([0-9a-zA-Z\-\_]+)\s*\}\}/, 'g' )
    let matches

    while ( ( matches = regex.exec( elementHtml )) !== null  ) {
        const [ , matchData ] = matches
        yield matchData
    }
}
  
function generateUid(
    length = 4,
    chars = '0123456789abcdefghijklmnopqrstuvwxyz'
) {
    let str = '';
    for (let i = length; i > 0; --i) {
        str += chars[ Math.floor(Math.random() * chars.length) ];
    }
  
    return str;
}