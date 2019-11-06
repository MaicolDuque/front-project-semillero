<template>
  <div style="padding:25px">
        <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Periodos académicos - {{nombre}}</h1>
          </div>         
        </div>
      </div>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-4">
          <div class="card">            
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Periodo</th>                    
                  </tr>
                </thead>                
                 <tbody>
                  <tr>
                    <td>1115</td>
                  </tr>
                  <tr>
                    <td>85</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
        </div>
        <div class="col-8">
          INFOOOOO
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data(){
    return {
      nombre: "Semillero 1"
    }
  }
}
</script>