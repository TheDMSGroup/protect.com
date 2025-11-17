<template>
  <section class='insurance-requirements'>
    <div class='container'>
      <div class='section-header'>
        <h2>{{ state.state }} Auto Insurance Requirements</h2>
        <p>Understanding minimum coverage laws in the {{ state.nickname }}</p>
      </div>

      <div class='requirements-content'>
        <div class='requirements-card'>
          <div class='card'>
            <h3>
              <i class='fas fa-shield-alt'></i>
              Minimum Coverage Requirements
            </h3>

            <div class='requirements-list'>
              <div class='requirement-item'>
                <div class='requirement-details'>
                  <div class='requirement-title'>Bodily Injury (per person)</div>
                  <div class='requirement-subtitle'>Maximum per individual</div>
                </div>
                <div class='requirement-value'>{{ state.bodilyInjuryPerPerson }}</div>
              </div>

              <div class='requirement-item'>
                <div class='requirement-details'>
                  <div class='requirement-title'>Bodily Injury (per accident)</div>
                  <div class='requirement-subtitle'>Maximum per incident</div>
                </div>
                <div class='requirement-value'>{{ state.bodilyInjuryPerAccident }}</div>
              </div>

              <div class='requirement-item'>
                <div class='requirement-details'>
                  <div class='requirement-title'>Property Damage</div>
                  <div class='requirement-subtitle'>Damage to other vehicles/property</div>
                </div>
                <div class='requirement-value'>{{ state.propertyDamage }}</div>
              </div>
            </div>

            <div class='important-note'>
              <div class='note-icon'>
                <i class='fas fa-exclamation-triangle'></i>
              </div>
              <div class='note-content'>
                <div class='note-title'>Important Note</div>
                <div class='note-text'>
                  {{ state.state }} is {{ state.faultType === 'At-fault' ? 'an' : 'a' }}
                  <strong>{{ state.faultType.toLowerCase() }}</strong> state.
                  {{ faultTypeDescription }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class='help-section'>
          <div class='help-card'>
            <img
              src='https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600'
              alt='Professional insurance agent'
              class='help-image'
            />
            <div class='help-overlay'>
              <h4>Need Help Choosing Coverage?</h4>
              <p>Our {{ state.state }} insurance experts are here to help you find the right coverage at the best price.</p>
              <button class='btn btn-accent'>Speak with an Expert</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InsuranceRequirements',
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
  computed: {
    faultTypeDescription() {
      return this.state.faultType === 'At-fault'
        ? 'The driver who causes an accident is responsible for damages.'
        : 'Your own insurance covers your injuries regardless of who caused the accident.';
    },
  },
};
</script>

<style lang='scss' scoped>
.insurance-requirements {
  padding: 4rem 0;

  .requirements-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
    align-items: start;

    // @include mobile {
    //   grid-template-columns: 1fr;
    //   gap: var(--spacing-lg);
    // }
  }

  .requirements-card {
    h3 {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-lg);
      color: var(--primary-color);

      i {
        font-size: 1.25rem;
      }
    }
  }

  .requirements-list {
    .requirement-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md) 0;
      border-bottom: 1px solid var(--border-color);

      &:last-child {
        border-bottom: none;
      }

      .requirement-details {
        .requirement-title {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .requirement-subtitle {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
      }

      .requirement-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--primary-color);
      }
    }
  }

  .important-note {
    display: flex;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-lg);
    padding: var(--spacing-md);
    background: #fef3c7;
    border: 1px solid #f59e0b;
    border-radius: var(--radius-md);

    .note-icon {
      color: #f59e0b;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .note-content {
      .note-title {
        font-weight: 600;
        color: #92400e;
        margin-bottom: 0.25rem;
      }

      .note-text {
        color: #92400e;
        font-size: 0.875rem;
      }
    }
  }

  .help-section {
    .help-card {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
    }

    .help-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    .help-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
      color: white;
      padding: var(--spacing-lg);

      h4 {
        margin-bottom: var(--spacing-sm);
        color: white;
      }

      p {
        margin-bottom: var(--spacing-md);
        opacity: 0.9;
      }
    }
  }
}
</style>
